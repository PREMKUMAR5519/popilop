import AnalyticsEvent from '../models/AnalyticsEvent.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import CrmLead from '../models/CrmLead.js';
import AutomationLog from '../models/AutomationLog.js';
import ScheduledPost from '../models/ScheduledPost.js';

export const trackEvent = payload => AnalyticsEvent.create(payload);

const buildSeriesMap = () => {
  const map = new Map();
  for (let index = 6; index >= 0; index -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    const key = date.toISOString().slice(0, 10);
    map.set(key, {
      date: key,
      name: date.toLocaleDateString('en-US', { weekday: 'short' }),
      views: 0,
      clicks: 0,
      sales: 0
    });
  }
  return map;
};

export const getDashboardAnalytics = async creatorId => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setHours(0, 0, 0, 0);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

  const [views, clicks, purchases, leads, topProducts, recentPosts, automationPerformance, eventSeries, orderSeries] = await Promise.all([
    AnalyticsEvent.countDocuments({ creator: creatorId, type: 'page-view' }),
    AnalyticsEvent.countDocuments({ creator: creatorId, type: { $in: ['link-click', 'affiliate-click'] } }),
    Order.find({ creator: creatorId, status: { $in: ['paid', 'fulfilled'] } }),
    CrmLead.find({ creator: creatorId }).sort({ updatedAt: -1 }).limit(5),
    Product.find({ creator: creatorId }).sort({ 'stats.revenue': -1 }).limit(4),
    ScheduledPost.find({ creator: creatorId }).sort({ scheduledFor: 1 }).limit(4),
    AutomationLog.find({ creator: creatorId }).sort({ createdAt: -1 }).limit(5),
    AnalyticsEvent.aggregate([
      { $match: { creator: creatorId, occurredAt: { $gte: sevenDaysAgo }, type: { $in: ['page-view', 'link-click', 'affiliate-click'] } } },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: '%Y-%m-%d', date: '$occurredAt' } },
            type: '$type'
          },
          count: { $sum: 1 }
        }
      }
    ]),
    Order.aggregate([
      { $match: { creator: creatorId, status: { $in: ['paid', 'fulfilled'] }, createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          total: { $sum: '$amount' }
        }
      }
    ])
  ]);

  const sales = purchases.reduce((sum, order) => sum + (order.amount || 0), 0);
  const seriesMap = buildSeriesMap();

  eventSeries.forEach(item => {
    const point = seriesMap.get(item._id.day);
    if (!point) {
      return;
    }

    if (item._id.type === 'page-view') {
      point.views = item.count;
    } else {
      point.clicks += item.count;
    }
  });

  orderSeries.forEach(item => {
    const point = seriesMap.get(item._id);
    if (point) {
      point.sales = item.total;
    }
  });

  return {
    stats: {
      views,
      clicks,
      sales,
      conversionRate: views ? Number(((purchases.length / views) * 100).toFixed(2)) : 0
    },
    series: Array.from(seriesMap.values()),
    recentLeads: leads,
    topProducts,
    recentPosts,
    automationPerformance
  };
};

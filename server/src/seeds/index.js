import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import env from '../config/env.js';
import { connectDatabase } from '../config/database.js';
import User from '../models/User.js';
import CreatorProfile from '../models/CreatorProfile.js';
import LandingPage from '../models/LandingPage.js';
import LandingBlock from '../models/LandingBlock.js';
import SocialLink from '../models/SocialLink.js';
import InstagramConnection from '../models/InstagramConnection.js';
import CrmLead from '../models/CrmLead.js';
import CrmActivity from '../models/CrmActivity.js';
import ScheduledPost from '../models/ScheduledPost.js';
import Automation from '../models/Automation.js';
import AutomationLog from '../models/AutomationLog.js';
import Product from '../models/Product.js';
import Order from '../models/Order.js';
import AffiliateLink from '../models/AffiliateLink.js';
import AnalyticsEvent from '../models/AnalyticsEvent.js';
import MediaAsset from '../models/MediaAsset.js';
import CreatorSetting from '../models/CreatorSetting.js';

const removeKnownDemoData = async () => {
  const demoUser = await User.findOne({ email: 'mila@halostudio.app' });
  const demoCreator = await CreatorProfile.findOne({ slug: 'mila-hart' });
  const creatorId = demoCreator?._id;
  const landingPage = creatorId ? await LandingPage.findOne({ creator: creatorId }) : null;

  if (landingPage?._id) {
    await LandingBlock.deleteMany({ landingPage: landingPage._id });
  }

  if (creatorId) {
    await Promise.all([
      SocialLink.deleteMany({ creator: creatorId }),
      InstagramConnection.deleteMany({ creator: creatorId }),
      CrmLead.deleteMany({ creator: creatorId }),
      CrmActivity.deleteMany({ creator: creatorId }),
      ScheduledPost.deleteMany({ creator: creatorId }),
      Automation.deleteMany({ creator: creatorId }),
      AutomationLog.deleteMany({ creator: creatorId }),
      Product.deleteMany({ creator: creatorId }),
      Order.deleteMany({ creator: creatorId }),
      AffiliateLink.deleteMany({ creator: creatorId }),
      AnalyticsEvent.deleteMany({ creator: creatorId }),
      MediaAsset.deleteMany({ creator: creatorId }),
      CreatorSetting.deleteMany({ creator: creatorId }),
      LandingPage.deleteMany({ creator: creatorId })
    ]);
  }

  if (demoCreator?._id) {
    await CreatorProfile.deleteOne({ _id: demoCreator._id });
  }

  if (demoUser?._id) {
    await User.deleteOne({ _id: demoUser._id });
  }
};

const ensureAdmin = async () => {
  const passwordHash = await bcrypt.hash(env.defaultAdminPassword, 10);
  await User.findOneAndUpdate(
    { email: env.defaultAdminEmail },
    {
      name: 'Platform Admin',
      email: env.defaultAdminEmail,
      passwordHash,
      role: 'admin',
      status: 'active'
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
};

const seed = async () => {
  await connectDatabase();
  await removeKnownDemoData();
  await ensureAdmin();

  console.log('Bootstrap complete');
  console.log(`Admin ensured: ${env.defaultAdminEmail}`);
  console.log('Known demo creator data removed if it existed.');

  await mongoose.connection.close();
};

seed().catch(async error => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});

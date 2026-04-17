import CrmLead from '../models/CrmLead.js';
import CrmActivity from '../models/CrmActivity.js';
import { buildPaginatedResponse, buildPagination } from '../utils/query.js';

export const listLeads = async (creatorId, query) => {
  const { page, limit, skip } = buildPagination(query);
  const filters = { creator: creatorId };

  if (query.status) {
    filters.status = query.status;
  }

  if (query.search) {
    filters.$or = [
      { name: new RegExp(query.search, 'i') },
      { instagramHandle: new RegExp(query.search, 'i') },
      { email: new RegExp(query.search, 'i') }
    ];
  }

  const [items, total] = await Promise.all([
    CrmLead.find(filters).sort({ updatedAt: -1 }).skip(skip).limit(limit),
    CrmLead.countDocuments(filters)
  ]);

  return buildPaginatedResponse({ items, total, page, limit });
};

export const addLeadActivity = async ({ creator, lead, type, message, metadata }) =>
  CrmActivity.create({ creator, lead, type, message, metadata });


import CrmLead from '../models/CrmLead.js';
import CrmActivity from '../models/CrmActivity.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { addLeadActivity, listLeads } from '../services/crmService.js';

export const listLeadsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const data = await listLeads(creator._id, req.query);
  res.json({ success: true, ...data });
});

export const createLeadController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await CrmLead.create({ creator: creator._id, ...req.body });
  await addLeadActivity({
    creator: creator._id,
    lead: item._id,
    type: 'note',
    message: 'Lead created from dashboard'
  });
  res.status(201).json({ success: true, item });
});

export const getLeadController = asyncHandler(async (req, res) => {
  const item = await CrmLead.findById(req.params.id);
  const activities = await CrmActivity.find({ lead: req.params.id }).sort({ createdAt: -1 });
  res.json({ success: true, item: { lead: item, activities } });
});

export const updateLeadController = asyncHandler(async (req, res) => {
  const item = await CrmLead.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, item });
});

export const addLeadNoteController = asyncHandler(async (req, res) => {
  const lead = await CrmLead.findById(req.params.id);
  const activity = await addLeadActivity({
    creator: lead.creator,
    lead: lead._id,
    type: 'note',
    message: req.body.message
  });
  res.status(201).json({ success: true, item: activity });
});

import Automation from '../models/Automation.js';
import AutomationLog from '../models/AutomationLog.js';
import CrmLead from '../models/CrmLead.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { getCreatorProfileByUserId } from '../services/creatorContextService.js';
import { executeAutomation } from '../services/automationService.js';

export const listAutomationsController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const [items, logs] = await Promise.all([
    Automation.find({ creator: creator._id }).sort({ updatedAt: -1 }),
    AutomationLog.find({ creator: creator._id }).sort({ createdAt: -1 }).limit(20)
  ]);
  res.json({ success: true, item: { automations: items, logs } });
});

export const createAutomationController = asyncHandler(async (req, res) => {
  const creator = await getCreatorProfileByUserId(req.user._id);
  const item = await Automation.create({ creator: creator._id, ...req.validated.body });
  res.status(201).json({ success: true, item });
});

export const updateAutomationController = asyncHandler(async (req, res) => {
  const item = await Automation.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ success: true, item });
});

export const runAutomationTestController = asyncHandler(async (req, res) => {
  const automation = await Automation.findById(req.params.id);
  const lead = await CrmLead.findOne({ creator: automation.creator });
  const log = await executeAutomation({
    automation,
    lead,
    payload: {
      comment: req.body.comment || 'price',
      targetPost: automation.targetContentId,
      leadHandle: lead?.instagramHandle
    }
  });
  res.json({ success: true, item: log });
});


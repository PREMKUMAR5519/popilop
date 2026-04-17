import AutomationLog from '../models/AutomationLog.js';
import { getInstagramProvider } from '../integrations/instagram/providerFactory.js';

export const executeAutomation = async ({ automation, lead, payload }) => {
  const provider = getInstagramProvider('meta-instagram');
  const response = await provider.triggerDm(payload);

  return AutomationLog.create({
    automation: automation._id,
    creator: automation.creator,
    lead: lead?._id,
    triggerPayload: payload,
    sendStatus: response.ok ? 'sent' : 'queued',
    responseMessage: response.message,
    sentAt: response.ok ? new Date() : null
  });
};


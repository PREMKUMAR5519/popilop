import { useEffect, useState } from 'react';
import { settingsApi } from '../../api/appApi';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import InputField from '../../components/common/InputField';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';

export default function SettingsPage() {
  const { settings, refresh } = useAppData();
  const { toast } = useToast();
  const [form, setForm] = useState({
    timezone: settings?.timezone || '',
    brandColor: settings?.brandColor || '',
    billingEmail: settings?.billing?.email || ''
  });

  useEffect(() => {
    setForm({
      timezone: settings?.timezone || '',
      brandColor: settings?.brandColor || '',
      billingEmail: settings?.billing?.email || ''
    });
  }, [settings]);

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSave = async () => {
    try {
      await settingsApi.update({
        timezone: form.timezone,
        brandColor: form.brandColor,
        billing: { email: form.billingEmail }
      });
      await refresh();
      toast('Settings saved', 'success');
    } catch (error) {
      toast(error.response?.data?.message || 'Failed to save settings', 'error');
    }
  };

  return (
    <div className="l_grid l_grid--2">
      <Card>
        <p className="c_eyebrow">Workspace settings</p>
        <div className="c_form-stack">
          <InputField label="Timezone" name="timezone" value={form.timezone} onChange={handleChange} />
          <InputField label="Brand color" name="brandColor" value={form.brandColor} onChange={handleChange} />
          <InputField label="Billing email" name="billingEmail" type="email" value={form.billingEmail} onChange={handleChange} />
          <Button onClick={handleSave}>Save settings</Button>
        </div>
      </Card>
      <Card>
        <p className="c_eyebrow">Billing-ready structure</p>
        <p>Billing data is now sourced from the server settings document. Hook your payment provider into the backend billing object when ready.</p>
      </Card>
    </div>
  );
}

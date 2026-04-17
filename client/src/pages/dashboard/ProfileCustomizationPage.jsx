import { useEffect, useState } from 'react';
import { creatorApi } from '../../api/appApi';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import InputField from '../../components/common/InputField';
import { useAppData } from '../../hooks/useAppData';
import { useToast } from '../../hooks/useToast';

export default function ProfileCustomizationPage() {
  const { creatorProfile, refresh } = useAppData();
  const { toast } = useToast();
  const [form, setForm] = useState({
    displayName: '',
    headline: '',
    bio: ''
  });

  useEffect(() => {
    setForm({
      displayName: creatorProfile?.displayName || '',
      headline: creatorProfile?.headline || '',
      bio: creatorProfile?.bio || ''
    });
  }, [creatorProfile]);

  const handleChange = event => {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSave = async () => {
    try {
      await creatorApi.updateProfile(form);
      await refresh();
      toast('Profile updated', 'success');
    } catch (error) {
      toast(error.response?.data?.message || 'Failed to update profile', 'error');
    }
  };

  return (
    <Card>
      <p className="c_eyebrow">Profile customization</p>
      <h2>Refine public creator identity</h2>
      <div className="c_form-stack">
        <InputField label="Display name" name="displayName" value={form.displayName} onChange={handleChange} />
        <InputField label="Headline" name="headline" value={form.headline} onChange={handleChange} />
        <InputField label="Bio" name="bio" textarea rows="5" value={form.bio} onChange={handleChange} />
        <Button onClick={handleSave}>Update profile</Button>
      </div>
    </Card>
  );
}

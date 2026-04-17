import Button from '../components/common/Button';
import Card from '../components/common/Card';
import InputField from '../components/common/InputField';
import { useToast } from '../hooks/useToast';

export default function ForgotPasswordPage() {
  const { toast } = useToast();

  return (
    <div className="p_auth">
      <Card className="p_auth__card">
        <p className="c_eyebrow">Reset flow</p>
        <h1>Request a password reset</h1>
        <InputField label="Email" type="email" placeholder="name@example.com" />
        <Button onClick={() => toast('Password reset flow is scaffolded for API hookup', 'info')}>Send reset link</Button>
      </Card>
    </div>
  );
}


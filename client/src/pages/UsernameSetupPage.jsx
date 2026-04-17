import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { authApi } from '../api/appApi';

// Generate username suggestions from a full name
function makeSuggestions(name) {
  if (!name) return [];
  const clean = name.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (!parts.length) return [];

  const joined = parts.join('');
  const dotted = parts.join('.');
  const underscored = parts.join('_');
  const firstLast = parts.length > 1 ? parts[0][0] + parts[parts.length - 1] : joined;
  const withNum = joined + (Math.floor(Math.random() * 90) + 10);

  return [...new Set([dotted, joined, withNum, underscored, firstLast])]
    .filter(s => s.length >= 3 && /^[a-z0-9._-]+$/.test(s))
    .slice(0, 5);
}

const STATUS = { idle: 'idle', checking: 'checking', ok: 'ok', taken: 'taken', invalid: 'invalid' };

export default function UsernameSetupPage() {
  const { user, setUsername } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [input, setInput] = useState('');
  const [status, setStatus] = useState(STATUS.idle);
  const [saving, setSaving] = useState(false);

  const suggestions = useMemo(() => makeSuggestions(user?.name), [user?.name]);

  // Debounced availability check
  useEffect(() => {
    const val = input.trim();

    if (!val || val.length < 3) {
      setStatus(STATUS.idle);
      return;
    }
    if (!/^[a-z0-9._-]+$/.test(val)) {
      setStatus(STATUS.invalid);
      return;
    }

    setStatus(STATUS.checking);
    const timer = setTimeout(async () => {
      try {
        const { available } = await authApi.checkUsername(val);
        setStatus(available ? STATUS.ok : STATUS.taken);
      } catch {
        setStatus(STATUS.idle);
      }
    }, 480);

    return () => clearTimeout(timer);
  }, [input]);

  const handleInput = e => {
    // Only allow valid chars, auto-lowercase
    setInput(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''));
  };

  const pickSuggestion = s => setInput(s);

  const handleClaim = async () => {
    if (status !== STATUS.ok || saving) return;
    setSaving(true);
    try {
      await setUsername(input.trim());
      toast(`@${input} is all yours`, 'success');
      navigate('/app');
    } catch (error) {
      toast(error.response?.data?.message || 'Could not save username', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleSkip = () => navigate('/app');

  // Status badge
  const badge = {
    [STATUS.idle]: null,
    [STATUS.checking]: <span className="p_uname__badge p_uname__badge--muted">checking…</span>,
    [STATUS.ok]: <span className="p_uname__badge p_uname__badge--ok">available</span>,
    [STATUS.taken]: <span className="p_uname__badge p_uname__badge--err">taken</span>,
    [STATUS.invalid]: <span className="p_uname__badge p_uname__badge--err">a-z · 0-9 · . _ -</span>
  };

  return (
    <div className="p_uname">
      <div className="p_uname__card">

        {/* Brand */}
        <div className="p_uname__brand">
          <span className="l_brand__mark">H</span>
        </div>

        {/* Heading */}
        <div className="p_uname__heading">
          <p className="c_eyebrow">One last step</p>
          <h1>Pick your username</h1>
          <p>
            Your username is your public handle on Halo Studio.
            {user?.name ? ` Welcome, ${user.name.split(' ')[0]}.` : ''} You can always change it later.
          </p>
        </div>

        {/* Input */}
        <div className="p_uname__input-row">
          <div className="p_uname__input-wrap">
            <span className="p_uname__at">@</span>
            <input
              className="p_uname__input"
              placeholder="yourname"
              value={input}
              onChange={handleInput}
              maxLength={30}
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          {badge[status]}
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="p_uname__suggestions">
            <p className="p_uname__suggestions-label">Suggestions</p>
            <div className="p_uname__chips">
              {suggestions.map(s => (
                <button
                  key={s}
                  type="button"
                  className={`p_uname__chip ${input === s ? 'p_uname__chip--active' : ''}`}
                  onClick={() => pickSuggestion(s)}
                >
                  @{s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p_uname__actions">
          <Button
            onClick={handleClaim}
            disabled={status !== STATUS.ok || saving}
          >
            {saving ? 'Saving…' : 'Claim username'}
          </Button>
          <button type="button" className="p_uname__skip" onClick={handleSkip}>
            Skip for now
          </button>
        </div>

      </div>
    </div>
  );
}

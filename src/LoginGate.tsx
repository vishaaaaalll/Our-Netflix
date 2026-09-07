import { useState, useEffect, type FormEvent } from 'react';
import { Heart, Lock, LogOut, Film, ArrowRight } from 'lucide-react';

const VALID_IDS = ['7827148228', '8800664093'];
const PASSWORD = 'iloveyou';
const SESSION_KEY = 'ournetflix-auth';
const HERO_IMAGE = '/IMG_8643.jpg';

export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === 'granted';
  } catch {
    return false;
  }
}

export function logout(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* ignore */
  }
}

export function LoginGate({ onSuccess }: { onSuccess: () => void }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [exiting, setExiting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    setTimeout(() => {
      if (VALID_IDS.includes(id.trim()) && password === PASSWORD) {
        try {
          sessionStorage.setItem(SESSION_KEY, 'granted');
        } catch {
          /* ignore */
        }
        setExiting(true);
        setTimeout(onSuccess, 900);
      } else {
        setError("Hmm... that doesn't look like our secret entrance \u2764\uFE0F");
        setSubmitting(false);
      }
    }, 650);
  };

  return (
    <div className={`login-gate ${exiting ? 'login-exiting' : ''}`}>
      <div className="login-bg" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
      <div className="login-vignette" />
      <div className="login-particles">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="login-particle" style={{
            left: `${(i * 7.3 + 5) % 100}%`,
            animationDelay: `${(i * 1.7) % 12}s`,
            animationDuration: `${10 + (i % 5) * 3}s`,
          }} />
        ))}
      </div>

      <div className="login-card">
        <div className="login-glow" />
        <div className="login-brand">
          <span className="login-brand-mark"><Film size={18} /></span>
          OUR<span>NETFLIX</span>
        </div>
        <p className="login-eyebrow">Our Netflix</p>
        <h1 className="login-title">Welcome to Our Story <span className="login-heart"><Heart size={36} fill="currentColor" /></span></h1>
        <p className="login-subtitle">A little universe that belongs to us.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label className="login-field">
            <span className="login-label">Your ID</span>
            <input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your ID"
              autoComplete="off"
              spellCheck={false}
            />
          </label>
          <label className="login-field">
            <span className="login-label">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="off"
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className={`button button-light login-enter ${submitting ? 'loading' : ''}`} disabled={submitting}>
            {submitting ? 'Opening...' : <>Enter Our Story <ArrowRight size={16} /></>}
          </button>
        </form>

        <p className="login-footer">Two people. One story. Countless memories.</p>
      </div>
    </div>
  );
}

export function LogoutButton({ onLogout }: { onLogout: () => void }) {
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (!confirming) return;
    const timer = setTimeout(() => setConfirming(false), 3000);
    return () => clearTimeout(timer);
  }, [confirming]);

  return (
    <button
      className="logout-button"
      onClick={() => {
        if (confirming) {
          onLogout();
        } else {
          setConfirming(true);
        }
      }}
      aria-label="Log out"
    >
      <LogOut size={18} />
      {confirming ? 'Confirm?' : 'Logout'}
    </button>
  );
}

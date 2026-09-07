import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { Heart, LogOut, Film, ArrowRight } from 'lucide-react';

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

const EMOJIS = ['❤️', '💕', '💗', '💖', '💘', '🥰', '😘', '😇', '🌸', '✨', '💋', '😍'];
const PHRASES = [
  'I LOVE YOU ❤️', 'I LOVE YOU BABY', 'CUTE ANUSHA 🥰', 'MY BEAUTIFUL BABY ❤️',
  'MOTA BUBA 😂❤️', 'PYAARA BABY 🥰', 'MY CUTIE 💕', 'MY BABY ❤️',
  'MERI JAAN ❤️', 'LOVE YOU SO MUCH 💖', 'ANUSHA ❤️', 'MY FAVOURITE PERSON 🫶',
  'CUTIEEEE 😘', 'MY BEAUTIFUL GIRL ❤️', 'FOREVER US 💕', 'ONLY YOU ❤️', 'MY HOME 🥰','BABY 🥰',
];

type FloatItem = {
  content: string;
  isPhrase: boolean;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  opacity: number;
  pattern: 'bounce' | 'pulse' | 'sway' | 'rotate' | 'drift';
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function FloatingElements() {
  const items = useMemo<FloatItem[]>(() => {
    const rng = seededRandom(42);
    const all: FloatItem[] = [];

    const patterns: FloatItem['pattern'][] = ['bounce', 'pulse', 'sway', 'rotate', 'drift'];

    // Floating emojis — 18 items
    for (let i = 0; i < 18; i++) {
      all.push({
        content: EMOJIS[Math.floor(rng() * EMOJIS.length)],
        isPhrase: false,
        left: 5 + rng() * 90,
        top: 5 + rng() * 90,
        size: 14 + rng() * 26,
        duration: 4 + rng() * 3,
        delay: rng() * 0.5,
        rotation: (rng() - 0.5) * 30,
        opacity: 0.3 + rng() * 0.35,
        pattern: patterns[Math.floor(rng() * patterns.length)],
      });
    }

    // Floating phrases — 12 items
    for (let i = 0; i < 12; i++) {
      all.push({
        content: PHRASES[Math.floor(rng() * PHRASES.length)],
        isPhrase: true,
        left: 5 + rng() * 85,
        top: 8 + rng() * 84,
        size: 11 + rng() * 14,
        duration: 5 + rng() * 3,
        delay: rng() * 0.5,
        rotation: (rng() - 0.5) * 20,
        opacity: 0.15 + rng() * 0.25,
        pattern: patterns[Math.floor(rng() * patterns.length)],
      });
    }

    // Large occasional hearts — 4 items
    for (let i = 0; i < 4; i++) {
      all.push({
        content: EMOJIS[Math.floor(rng() * 4)],
        isPhrase: false,
        left: 10 + rng() * 80,
        top: 10 + rng() * 80,
        size: 50 + rng() * 35,
        duration: 4 + rng() * 2,
        delay: rng() * 0.5,
        rotation: 0,
        opacity: 0.1 + rng() * 0.12,
        pattern: 'pulse',
      });
    }

    return all;
  }, []);

  return (
    <div className="login-float-layer" aria-hidden="true">
      {items.map((item, i) => (
        <span
          key={i}
          className={`login-float-item ${item.isPhrase ? 'login-float-phrase' : ''} ${item.size > 45 ? 'login-float-large' : ''} login-float-${item.pattern}`}
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
            '--float-rotation': `${item.rotation}deg`,
            '--float-opacity': String(item.opacity),
          } as React.CSSProperties}
        >
          {item.content}
        </span>
      ))}
    </div>
  );
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
      <FloatingElements />

      <div className="login-card">
        <div className="login-glow" />
        <div className="login-brand">
          <span className="login-brand-mark"><Film size={18} /></span>
          OUR<span>NETFLIX</span>
        </div>
        <p className="login-eyebrow">Dear Baby</p>
        <h1 className="login-title">Welcome to Our Story Anusha <span className="login-heart"><Heart size={36} fill="currentColor" /></span></h1>
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

import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';

type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'ournetflix-theme';
const THEME_COLOR = { dark: '#0c0a0b', light: '#f7f4f2' };

function getStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  } catch {
    /* localStorage unavailable */
  }
  return 'system';
}

function systemPrefersDark() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(mode: ThemeMode) {
  const dark = mode === 'dark' || (mode === 'system' && systemPrefersDark());
  const root = document.documentElement;
  root.classList.toggle('dark', dark);
  root.classList.toggle('light', !dark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', dark ? THEME_COLOR.dark : THEME_COLOR.light);
}

const OPTIONS: { value: ThemeMode; label: string; Icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'system', label: 'System', Icon: Monitor },
];

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(getStoredMode);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    applyTheme(mode);
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore write failures */
    }
  }, [mode]);

  // Follow OS changes live while in System mode.
  useEffect(() => {
    if (mode !== 'system') return;
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyTheme('system');
    query.addEventListener('change', handler);
    return () => query.removeEventListener('change', handler);
  }, [mode]);

  // Close the menu on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const active = OPTIONS.find((option) => option.value === mode) ?? OPTIONS[2];
  const ActiveIcon = active.Icon;

  return (
    <div className="theme-toggle" ref={ref}>
      <button
        className="theme-menu-button"
        aria-label={`Theme: ${active.label}. Change theme`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <ActiveIcon size={19} />
      </button>
      {open && (
        <div className="theme-menu" role="menu" aria-label="Appearance">
          <span className="theme-menu-title">Appearance</span>
          {OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              role="menuitemradio"
              aria-checked={mode === value}
              className={mode === value ? 'active' : ''}
              onClick={() => {
                setMode(value);
                setOpen(false);
              }}
            >
              <Icon size={16} /> {label}
              {mode === value && (
                <span className="check">
                  <Check size={15} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

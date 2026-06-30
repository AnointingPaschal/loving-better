import { useState } from 'react';
import { lsGet, lsSet } from '../utils/storage';
import { UserIcon, HeartIcon, AlertCircleIcon, InfoIcon, SlidersIcon } from './Icons';

export function loadSettings() {
  return lsGet('lb_settings', { himName: 'Him', herName: 'Her', showScriptures: true, theme: 'rose' });
}

export default function SettingsView({ settings, onSettingsChange }) {
  const [confirmClear, setConfirmClear] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    const next = { ...settings, [key]: value };
    lsSet('lb_settings', next);
    onSettingsChange(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const clearToday = () => {
    const { getDailyKey } = require('../utils/storage');
    localStorage.removeItem(getDailyKey());
    setConfirmClear(false);
    window.location.reload();
  };

  const clearAll = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('lb_'));
    keys.forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #374151, #4B5563)', borderRadius: 14, padding: '18px 18px', marginBottom: 16, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SlidersIcon size={20} color="rgba(255,255,255,0.8)" />
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>App Settings</div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>Personalise</div>
          </div>
        </div>
        {saved && <div style={{ marginTop: 10, fontSize: 12, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 14px', display: 'inline-block' }}>✓ Saved</div>}
      </div>

      {/* Names */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 10px rgba(92,26,46,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <UserIcon size={16} color="#C0556A" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', fontFamily: 'Georgia, serif' }}>Your Names</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: '#C0556A', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>His name</label>
            <input
              value={settings.himName}
              onChange={e => update('himName', e.target.value)}
              placeholder="His name"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #F2A7B3', borderRadius: 10, fontFamily: 'Georgia, serif', fontSize: 14, color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: '#5A7A6E', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Her name</label>
            <input
              value={settings.herName}
              onChange={e => update('herName', e.target.value)}
              placeholder="Her name"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #A8D5C5', borderRadius: 10, fontFamily: 'Georgia, serif', fontSize: 14, color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 10px rgba(92,26,46,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <HeartIcon size={16} color="#C0556A" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', fontFamily: 'Georgia, serif' }}>Preferences</span>
        </div>
        {[
          { key: 'showScriptures', label: 'Show scriptures in Words section', desc: 'Include Bible verses alongside advice and quotes' },
        ].map(pref => (
          <div key={pref.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #FDE8EC' }}>
            <div style={{ flex: 1, paddingRight: 10 }}>
              <div style={{ fontSize: 13, color: '#2C1A1A', fontFamily: 'Georgia, serif' }}>{pref.label}</div>
              <div style={{ fontSize: 11, color: '#7A6060', fontFamily: 'sans-serif', marginTop: 2 }}>{pref.desc}</div>
            </div>
            <button
              onClick={() => update(pref.key, !settings[pref.key])}
              style={{
                width: 46, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', flexShrink: 0,
                background: settings[pref.key] ? '#C0556A' : '#D1D5DB',
                position: 'relative', transition: 'background 0.2s',
              }}
            >
              <span style={{
                position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white',
                transition: 'left 0.2s', left: settings[pref.key] ? 23 : 3,
              }} />
            </button>
          </div>
        ))}
      </div>

      {/* About */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 10px rgba(92,26,46,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <InfoIcon size={16} color="#5A7A6E" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', fontFamily: 'Georgia, serif' }}>About This App</span>
        </div>
        <p style={{ fontSize: 13, color: '#5C1A2E', fontFamily: 'Georgia, serif', fontStyle: 'italic', lineHeight: 1.7, margin: '0 0 8px' }}>
          "Loving Better" was built for two people who chose to have the honest conversation instead of walking away from it. It exists because that choice — however hard — is the right one.
        </p>
        <p style={{ fontSize: 12, color: '#7A6060', fontFamily: 'sans-serif', margin: 0 }}>
          All data is stored privately on this device only. Nothing is sent anywhere.
        </p>
        <div style={{ marginTop: 10, fontSize: 12, color: '#B8860B', fontFamily: 'sans-serif' }}>Version 2.0 · github.com/AnointingPaschal/loving-better</div>
      </div>

      {/* Danger zone */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <AlertCircleIcon size={16} color="#C05454" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#C05454', fontFamily: 'Georgia, serif' }}>Data</span>
        </div>
        {!confirmClear ? (
          <button onClick={() => setConfirmClear(true)} style={{ width: '100%', padding: '11px', background: 'none', border: '1px solid #FCA5A5', borderRadius: 10, color: '#C05454', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
            Clear all progress and start fresh
          </button>
        ) : (
          <div style={{ background: '#FFF5F5', borderRadius: 10, padding: '14px' }}>
            <p style={{ fontSize: 13, color: '#C05454', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>
              This will erase all checked tasks, streaks, journal entries, and saved wisdom. This cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={clearAll} style={{ flex: 1, padding: '10px', background: '#C05454', border: 'none', borderRadius: 10, color: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
                Yes, clear everything
              </button>
              <button onClick={() => setConfirmClear(false)} style={{ flex: 1, padding: '10px', background: 'none', border: '1px solid #E5E7EB', borderRadius: 10, color: '#374151', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: 16 }} />
    </>
  );
}

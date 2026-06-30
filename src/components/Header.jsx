import { HeartIcon, SlidersIcon } from './Icons';

export default function Header({ streaks, savedFlash, dailyDone, dailyTotal, weeklyDone, weeklyTotal, monthlyDone, monthlyTotal, activeTab, activePage, onSettingsClick }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const done   = activeTab === 'daily'   ? dailyDone   : activeTab === 'weekly' ? weeklyDone   : activeTab === 'monthly' ? monthlyDone   : 0;
  const total  = activeTab === 'daily'   ? dailyTotal  : activeTab === 'weekly' ? weeklyTotal  : activeTab === 'monthly' ? monthlyTotal  : 0;
  const pct    = total > 0 ? (done / total) * 100 : 0;
  const showBar = activePage === 'home' && activeTab !== 'progress';
  const isSettings = activePage === 'settings';

  return (
    <header className="header">
      <div className="header-top">
        <div style={{ flex: 1 }}>
          <div className="header-date">{dateStr}</div>
          <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Loving Better
            <HeartIcon size={18} color="#F2A7B3" filled />
          </div>
          <div className="header-subtitle">Your relationship growth tracker</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {savedFlash && (
            <span className="saved-pill visible">Saved</span>
          )}
          {/* Settings gear — top right */}
          <button
            onClick={onSettingsClick}
            style={{
              background: isSettings ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)',
              border: `1px solid ${isSettings ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '50%',
              width: 36, height: 36,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
            title="Settings"
          >
            <SlidersIcon size={16} color="white" />
          </button>
        </div>
      </div>

      {showBar && (
        <div className="header-progress">
          <div className="progress-label">
            <span style={{ textTransform: 'capitalize' }}>{activeTab} progress</span>
            <span>{done}/{total}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </header>
  );
}

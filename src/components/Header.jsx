import { HeartIcon } from './Icons';

export default function Header({ streaks, savedFlash, dailyDone, dailyTotal, weeklyDone, weeklyTotal, monthlyDone, monthlyTotal, activeTab, activePage }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  const done   = activeTab === 'daily' ? dailyDone   : activeTab === 'weekly' ? weeklyDone   : activeTab === 'monthly' ? monthlyDone   : 0;
  const total  = activeTab === 'daily' ? dailyTotal  : activeTab === 'weekly' ? weeklyTotal  : activeTab === 'monthly' ? monthlyTotal  : 0;
  const pct    = total > 0 ? (done / total) * 100 : 0;
  const showBar = activePage === 'home' && activeTab !== 'progress';

  return (
    <header className="header">
      <div className="header-top">
        <div>
          <div className="header-date">{dateStr}</div>
          <div className="header-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            Loving Better
            <HeartIcon size={18} color="#F2A7B3" filled />
          </div>
          <div className="header-subtitle">Your relationship growth tracker</div>
        </div>
        <span className={`saved-pill ${savedFlash ? 'visible' : ''}`}>Saved</span>
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

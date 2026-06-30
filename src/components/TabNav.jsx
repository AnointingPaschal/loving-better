const TABS = [
  { id: 'daily', label: 'Daily', icon: '☀️' },
  { id: 'weekly', label: 'Weekly', icon: '🗓' },
  { id: 'monthly', label: 'Monthly', icon: '💬' },
  { id: 'progress', label: 'Progress', icon: '📈' },
];

export default function TabNav({ active, onChange, counts }) {
  return (
    <nav className="tab-nav">
      {TABS.map(t => {
        const c = counts[t.id];
        const isDone = c && c.done === c.total && c.total > 0;
        return (
          <button
            key={t.id}
            className={`tab-btn ${active === t.id ? 'active' : ''} ${isDone ? 'done' : ''}`}
            onClick={() => onChange(t.id)}
          >
            {t.icon} {t.label}
            {c && (
              <span className="tab-badge">
                {isDone ? '✓' : `${c.done}/${c.total}`}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

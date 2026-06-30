import { SunIcon, CalWeekIcon, CalMonthIcon, TrendingUpIcon } from './Icons';

const TABS = [
  { id: 'daily',    label: 'Daily',   Icon: SunIcon },
  { id: 'weekly',   label: 'Weekly',  Icon: CalWeekIcon },
  { id: 'monthly',  label: 'Monthly', Icon: CalMonthIcon },
  { id: 'progress', label: 'Growth',  Icon: TrendingUpIcon },
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
            <t.Icon size={15} color={active === t.id ? '#5C1A2E' : 'rgba(255,255,255,0.6)'} />
            <span style={{ marginLeft: 4 }}>{t.label}</span>
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

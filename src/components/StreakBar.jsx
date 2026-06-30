import { FlameIcon, CalendarCheckIcon, StarIcon } from './Icons';

const ITEMS = [
  { Icon: FlameIcon,        color: '#C0556A', label: 'Day streak',   key: 'daily' },
  { Icon: CalendarCheckIcon,color: '#5A7A6E', label: 'Weeks done',   key: 'weekly' },
  { Icon: StarIcon,         color: '#B8860B', label: 'Reviews done', key: 'monthly' },
];

export default function StreakBar({ streaks }) {
  return (
    <div className="streak-bar">
      {ITEMS.map(s => (
        <div key={s.label} className="streak-card">
          <s.Icon size={22} color={s.color} />
          <div className="streak-value" style={{ color: s.color }}>{streaks[s.key] || 0}</div>
          <div className="streak-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

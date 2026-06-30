export default function StreakBar({ streaks }) {
  const items = [
    { icon: '🔥', value: streaks.daily || 0, label: 'Day streak' },
    { icon: '📅', value: streaks.weekly || 0, label: 'Weeks done' },
    { icon: '✨', value: streaks.monthly || 0, label: 'Reviews done' },
  ];
  return (
    <div className="streak-bar">
      {items.map(s => (
        <div key={s.label} className="streak-card">
          <span className="streak-icon">{s.icon}</span>
          <div className="streak-value">{s.value}</div>
          <div className="streak-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

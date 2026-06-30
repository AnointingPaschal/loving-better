import { ALL_DAILY, ALL_WEEKLY, ALL_MONTHLY } from '../data/tasks';
import { getLast7DaysHistory, loadStreaks } from '../utils/storage';

function Ring({ pct, color, size = 90, stroke = 9 }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#F2A7B3" strokeWidth={stroke} opacity={0.25} />
      <circle
        cx={size/2} cy={size/2} r={r} fill="none"
        stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.6s cubic-bezier(.4,0,.2,1)' }}
      />
    </svg>
  );
}

function StatRing({ label, done, total, color }) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 90, height: 90 }}>
        <Ring pct={pct} color={color} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 18, fontWeight: 'bold', color, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 9, color: '#7A6060', fontFamily: 'sans-serif' }}>{done}/{total}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: '#2C1A1A', fontFamily: 'Georgia, serif', textAlign: 'center' }}>{label}</div>
    </div>
  );
}

export default function ProgressView({ streaks, daily, weekly, monthly }) {
  const history = getLast7DaysHistory();
  const dailyDone = ALL_DAILY.filter(i => daily[i.id]).length;
  const weeklyDone = ALL_WEEKLY.filter(i => weekly[i.id]).length;
  const monthlyDone = ALL_MONTHLY.filter(i => monthly[i.id]).length;

  const principles = [
    "Small things done consistently beat grand gestures done rarely.",
    "The 24-hour rule: if something hurts, say it within a day.",
    "Every hard conversation avoided becomes tomorrow's resentment.",
    "Love that is not expressed in a language the other person can feel does not reach them.",
    "Trust is rebuilt in the gap between a promise made and a promise kept.",
    "Safety is built through repeated small moments of honesty received with tenderness.",
    "Repair within 24 hours of any significant rupture.",
    "You cannot pour from an empty cup — take care of yourself too.",
  ];

  const tip = principles[new Date().getDate() % principles.length];

  return (
    <>
      {/* Streak cards */}
      <div style={{ background: 'linear-gradient(135deg, #3D0C18, #7A2240)', borderRadius: 14, padding: '18px 16px', marginBottom: 16, color: 'white' }}>
        <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif', marginBottom: 12 }}>Your Streaks</div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          {[
            { icon: '🔥', val: streaks.daily || 0, label: 'Day streak' },
            { icon: '📅', val: streaks.weekly || 0, label: 'Weeks done' },
            { icon: '✨', val: streaks.monthly || 0, label: 'Reviews' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 24 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 'bold', lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's rings */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 12px rgba(92,26,46,0.08)' }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', marginBottom: 14, fontFamily: 'Georgia, serif' }}>Today's Completion</div>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <StatRing label="Daily" done={dailyDone} total={ALL_DAILY.length} color="#C0556A" />
          <StatRing label="Weekly" done={weeklyDone} total={ALL_WEEKLY.length} color="#5A7A6E" />
          <StatRing label="Monthly" done={monthlyDone} total={ALL_MONTHLY.length} color="#B8860B" />
        </div>
      </div>

      {/* Last 7 days */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 12px rgba(92,26,46,0.08)' }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', marginBottom: 14, fontFamily: 'Georgia, serif' }}>Last 7 Days</div>
        <div className="week-grid">
          {history.map((day, i) => (
            <div key={day.date} className="week-day">
              <div className="week-day-label">{day.label}</div>
              <div className={`week-day-dot ${day.daily ? 'done' : ''} ${i === 6 ? 'today' : ''}`}>
                {day.daily ? '✓' : '·'}
              </div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 10, color: '#7A6060', fontFamily: 'sans-serif', textAlign: 'center', marginTop: 10, fontStyle: 'italic' }}>
          ✓ = all daily tasks completed
        </div>
      </div>

      {/* Tip of the day */}
      <div className="pull-quote">
        <div style={{ fontSize: 10, color: '#C0556A', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Principle for today</div>
        <p>"{tip}"</p>
      </div>

      {/* Category breakdown */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 12px rgba(92,26,46,0.08)' }}>
        <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', marginBottom: 12, fontFamily: 'Georgia, serif' }}>Daily Breakdown</div>
        {[
          { label: "His tasks", done: [0,1,2,3,4,5].filter(i => daily[`dh${i+1}`]).length, total: 6, color: '#C0556A' },
          { label: "Her tasks", done: [1,2,3,4,5].filter(i => daily[`dr${i}`]).length, total: 5, color: '#5A7A6E' },
          { label: "Together", done: [1,2,3,4].filter(i => daily[`db${i}`]).length, total: 4, color: '#B8860B' },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ fontSize: 12, color: '#2C1A1A', fontFamily: 'Georgia, serif', width: 80, flexShrink: 0 }}>{row.label}</div>
            <div style={{ flex: 1, height: 8, background: '#FDE8EC', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${row.total > 0 ? (row.done/row.total)*100 : 0}%`, background: row.color, borderRadius: 10, transition: 'width 0.5s' }} />
            </div>
            <div style={{ fontSize: 11, color: '#7A6060', fontFamily: 'sans-serif', width: 30, textAlign: 'right' }}>{row.done}/{row.total}</div>
          </div>
        ))}
      </div>
    </>
  );
}

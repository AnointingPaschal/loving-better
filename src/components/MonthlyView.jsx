import { useState } from 'react';
import { MONTHLY_REVIEW, ALL_MONTHLY } from '../data/tasks';
import { CheckItem } from './CheckItem';
import { loadStreaks } from '../utils/storage';

const CATEGORIES = ['What Went Well', 'What Needs Attention', 'Looking Ahead', 'Closing'];
const CAT_COLORS = {
  'What Went Well': { color: '#5A7A6E', bg: '#F5FAF8' },
  'What Needs Attention': { color: '#C0556A', bg: '#FFF5F7' },
  'Looking Ahead': { color: '#B8860B', bg: '#FFFBF0' },
  'Closing': { color: '#5C1A2E', bg: '#FDE8EC' },
};

export default function MonthlyView({ checked, onToggle, notes, onNote }) {
  const [reflectionText, setReflectionText] = useState(notes['monthly_reflection']?.text || '');
  const done = ALL_MONTHLY.filter(i => checked[i.id]).length;
  const allDone = done === ALL_MONTHLY.length;
  const now = new Date();
  const monthStr = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <>
      <div style={{
        background: 'linear-gradient(135deg, #5C1A2E, #8B2246)',
        borderRadius: 14,
        padding: '18px 18px',
        marginBottom: 16,
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 11, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif', marginBottom: 4 }}>Monthly Review</div>
        <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 4 }}>{monthStr}</div>
        <div style={{ fontSize: 13, opacity: 0.8, fontStyle: 'italic' }}>Sit together. No phones. One speaks, the other listens fully before responding.</div>
        <div style={{ marginTop: 12, height: 5, background: 'rgba(255,255,255,0.2)', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(done / ALL_MONTHLY.length) * 100}%`, background: '#F2A7B3', borderRadius: 10, transition: 'width 0.5s' }} />
        </div>
        <div style={{ fontSize: 11, opacity: 0.7, marginTop: 5, fontFamily: 'sans-serif' }}>{done}/{ALL_MONTHLY.length} questions completed</div>
      </div>

      {allDone && (
        <div className="complete-badge">
          ✨ Monthly review complete — this is what real commitment looks like.
        </div>
      )}

      {CATEGORIES.map(cat => {
        const catItems = MONTHLY_REVIEW.filter(i => i.category === cat);
        const { color, bg } = CAT_COLORS[cat];
        return (
          <div key={cat} className="section-card" style={{ borderColor: `${color}30`, marginBottom: 14 }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}44)` }} />
            <div style={{ padding: '12px 16px 0' }}>
              <div className="category-label" style={{ color, borderTop: 'none', paddingTop: 0 }}>
                {cat}
              </div>
            </div>
            <div className="section-items" style={{ background: bg }}>
              {catItems.map(item => (
                <CheckItem key={item.id} item={item} checked={!!checked[item.id]} onToggle={onToggle} colorClass="rose" />
              ))}
            </div>
          </div>
        );
      })}

      <div className="section-card" style={{ borderColor: '#C0556A30' }}>
        <div style={{ height: 3, background: 'linear-gradient(90deg, #5C1A2E, #5C1A2E44)' }} />
        <div style={{ padding: '14px 16px' }}>
          <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', marginBottom: 8 }}>📝 Monthly Reflection Note</div>
          <div style={{ fontSize: 12, color: '#7A6060', fontStyle: 'italic', marginBottom: 8 }}>Write anything from this review you want to carry forward. Both of you can contribute.</div>
          <textarea
            className="notes-area"
            placeholder="This month we noticed… Next month we want to… One thing we're grateful for is…"
            value={reflectionText}
            onChange={e => {
              setReflectionText(e.target.value);
              onNote('monthly_reflection', e.target.value);
            }}
            style={{ minHeight: 100 }}
          />
        </div>
      </div>

      <div className="pull-quote" style={{ marginTop: 8 }}>
        <p>"Every month you complete this review is a month the relationship grows. The review is not a test. It is a tending."</p>
      </div>
    </>
  );
}

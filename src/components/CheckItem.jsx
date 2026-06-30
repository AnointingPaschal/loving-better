import { useState } from 'react';

export function CheckItem({ item, checked, onToggle, colorClass = '' }) {
  return (
    <button className="check-item" onClick={() => onToggle(item.id)}>
      <span className={`check-circle ${checked ? `checked ${colorClass}` : `unchecked-${colorClass || 'rose'}`}`}>
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
            <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span className={`check-text ${checked ? 'done' : ''}`}>{item.text}</span>
    </button>
  );
}

export function Section({ title, emoji, items, checked, onToggle, colorClass, accentColor, bgColor, noteKey, noteValue, onNote }) {
  const [open, setOpen] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const done = items.filter(i => checked[i.id]).length;
  const allDone = done === items.length;
  const countClass = allDone ? 'complete' : done > 0 ? 'partial' : 'empty';

  return (
    <div className="section-card" style={{ borderColor: `${accentColor}30` }}>
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <div className="section-title">
          <span className="section-emoji">{emoji}</span>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className={`section-count ${countClass}`}>
            {allDone ? '✓ Done' : `${done}/${items.length}`}
          </span>
          <button className={`section-collapse-btn ${open ? '' : 'collapsed'}`} onClick={e => { e.stopPropagation(); setOpen(o => !o); }}>▾</button>
        </div>
      </div>

      <div style={{ height: 3, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)` }} />

      {open && (
        <>
          <div className="section-items" style={{ background: bgColor }}>
            {items.map(item => (
              <CheckItem key={item.id} item={item} checked={!!checked[item.id]} onToggle={onToggle} colorClass={colorClass} />
            ))}
          </div>

          {onNote && (
            <div style={{ padding: '0 16px 12px', background: bgColor }}>
              <button
                onClick={() => setShowNote(s => !s)}
                style={{ fontSize: 11, color: accentColor, background: 'none', border: `1px solid ${accentColor}44`, borderRadius: 20, padding: '3px 10px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                {showNote ? '− Hide note' : '+ Add reflection note'}
              </button>
              {showNote && (
                <>
                  <textarea
                    className="notes-area"
                    placeholder="Write your reflection here…"
                    defaultValue={noteValue?.text || ''}
                    onChange={e => onNote(noteKey, e.target.value)}
                  />
                </>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

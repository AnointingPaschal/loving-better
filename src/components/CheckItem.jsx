import { useState } from 'react';
import { CheckCircleIcon, CircleIcon, ChevronDownIcon, ChevronUpIcon } from './Icons';

export function CheckItem({ item, checked, onToggle, accentColor = '#C0556A' }) {
  return (
    <button className="check-item" onClick={() => onToggle(item.id)}>
      {checked
        ? <CheckCircleIcon size={21} color={accentColor} fill={accentColor} style={{ flexShrink: 0, marginTop: 1 }} />
        : <CircleIcon size={21} color="#D1B8BC" style={{ flexShrink: 0, marginTop: 1 }} />
      }
      <span className={`check-text ${checked ? 'done' : ''}`}>{item.text}</span>
    </button>
  );
}

export function Section({ title, TitleIcon, items, checked, onToggle, accentColor, bgColor, noteKey, noteValue, onNote }) {
  const [open, setOpen] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const done = items.filter(i => checked[i.id]).length;
  const allDone = done === items.length;
  const countClass = allDone ? 'complete' : done > 0 ? 'partial' : 'empty';

  return (
    <div className="section-card" style={{ borderColor: `${accentColor}28`, marginBottom: 14 }}>
      <div className="section-header" onClick={() => setOpen(o => !o)}>
        <div className="section-title">
          {TitleIcon && <TitleIcon size={18} color={accentColor} />}
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className={`section-count ${countClass}`}>
            {allDone ? '✓ Done' : `${done}/${items.length}`}
          </span>
          {open ? <ChevronUpIcon size={15} color="#7A6060" /> : <ChevronDownIcon size={15} color="#7A6060" />}
        </div>
      </div>
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}44)` }} />

      {open && (
        <>
          <div className="section-items" style={{ background: bgColor }}>
            {items.map(item => (
              <CheckItem key={item.id} item={item} checked={!!checked[item.id]} onToggle={onToggle} accentColor={accentColor} />
            ))}
          </div>
          {onNote && (
            <div style={{ padding: '0 16px 12px', background: bgColor }}>
              <button
                onClick={() => setShowNote(s => !s)}
                style={{ fontSize: 11, color: accentColor, background: 'none', border: `1px solid ${accentColor}44`, borderRadius: 20, padding: '3px 12px', cursor: 'pointer', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                {showNote ? '− Hide note' : '+ Add reflection note'}
              </button>
              {showNote && (
                <textarea
                  className="notes-area"
                  placeholder="Write your reflection here…"
                  defaultValue={noteValue?.text || ''}
                  onChange={e => onNote(noteKey, e.target.value)}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

import { useState } from 'react';
import { WISDOM, getTypeColor } from '../data/wisdom';

function pickRandom(excluding = []) {
  const pool = WISDOM.filter(w => !excluding.includes(w.id));
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function RandomWisdom() {
  const [item, setItem] = useState(() => pickRandom());

  const refresh = () => setItem(prev => pickRandom([prev.id]));

  if (!item) return null;
  const { bg, border, label, labelColor } = getTypeColor(item.type);

  return (
    <div style={{
      background: bg,
      borderLeft: `3px solid ${border}`,
      borderRadius: '10px',
      padding: '13px 14px',
      marginBottom: '14px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
        <span style={{ fontSize: '10px', color: labelColor, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold' }}>
          {label}
        </span>
        <button onClick={refresh} title="New word" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: labelColor, padding: '0 2px', lineHeight: 1 }}>
          ↻
        </button>
      </div>
      <p style={{ fontSize: '13px', fontStyle: 'italic', color: '#2C1A1A', lineHeight: 1.6, margin: 0, fontFamily: 'Georgia, serif' }}>
        {item.type === 'scripture' || item.type === 'quote' ? `"${item.text}"` : item.text}
      </p>
      {item.author && (
        <p style={{ fontSize: '10.5px', color: '#7A6060', marginTop: '5px', textAlign: 'right', fontFamily: 'Georgia, serif' }}>
          — {item.author}
        </p>
      )}
    </div>
  );
}

import { useState } from 'react';
import { getTypeColor } from '../data/wisdom';
import { HeartIcon, CopyIcon } from './Icons';

export default function WisdomCard({ item, saved, onSave, compact = false }) {
  const [copied, setCopied] = useState(false);
  const { bg, border, label, labelColor } = getTypeColor(item.type);

  const handleCopy = () => {
    const text = item.author ? `"${item.text}" — ${item.author}` : item.text;
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true); setTimeout(() => setCopied(false), 1600);
    });
  };

  if (compact) {
    return (
      <div style={{ background: bg, borderLeft: `3px solid ${border}`, borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
        <div style={{ fontSize: 10, color: labelColor, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5, fontWeight: 'bold' }}>{label}</div>
        <p style={{ fontSize: 13, fontStyle: 'italic', color: '#2C1A1A', lineHeight: 1.6, margin: 0, fontFamily: 'Georgia, serif' }}>"{item.text}"</p>
        {item.author && <p style={{ fontSize: 11, color: '#7A6060', marginTop: 6, textAlign: 'right', fontFamily: 'Georgia, serif' }}>— {item.author}</p>}
      </div>
    );
  }

  return (
    <div style={{ background: bg, borderRadius: 14, padding: '18px 16px', marginBottom: 14, border: `1px solid ${border}44`, boxShadow: '0 2px 12px rgba(92,26,46,0.07)' }}>
      <div style={{ display: 'inline-block', fontSize: 10, color: labelColor, background: `${border}18`, border: `1px solid ${border}44`, borderRadius: 20, padding: '3px 10px', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 'bold', marginBottom: 10 }}>{label}</div>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, color: '#2C1A1A', fontFamily: 'Georgia, serif', fontStyle: item.type === 'spark' ? 'normal' : 'italic', margin: '0 0 12px' }}>
        {item.type === 'scripture' || item.type === 'quote' ? `"${item.text}"` : item.text}
      </p>
      {item.author && <p style={{ fontSize: 12, color: '#7A6060', fontFamily: 'Georgia, serif', textAlign: 'right', margin: '0 0 12px' }}>— {item.author}</p>}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: `1px solid ${border}66`, borderRadius: 20, padding: '5px 12px', fontSize: 11, cursor: 'pointer', color: labelColor, fontFamily: 'sans-serif' }}>
          <CopyIcon size={12} color={labelColor} />
          {copied ? 'Copied' : 'Copy'}
        </button>
        <button onClick={() => onSave && onSave(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 5, background: saved ? border : 'none', border: `1px solid ${border}66`, borderRadius: 20, padding: '5px 12px', fontSize: 11, cursor: 'pointer', color: saved ? 'white' : labelColor, fontFamily: 'sans-serif', transition: 'all 0.2s' }}>
          <HeartIcon size={12} color={saved ? 'white' : labelColor} filled={saved} />
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

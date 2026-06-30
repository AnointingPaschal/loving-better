import { useEffect, useState } from 'react';

const COLORS = ['#C0556A', '#F2A7B3', '#B8860B', '#FDF3DC', '#5A7A6E', '#D4EAE2', '#5C1A2E', '#FFF8F0'];

function randomBetween(a, b) { return a + Math.random() * (b - a); }

export default function Confetti({ onDone }) {
  const [pieces] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${randomBetween(5, 95)}%`,
      delay: `${randomBetween(0, 0.8)}s`,
      duration: `${randomBetween(1.8, 2.8)}s`,
      color: COLORS[i % COLORS.length],
      size: randomBetween(6, 11),
      rotate: randomBetween(0, 360),
    }))
  );

  useEffect(() => {
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="confetti-wrap">
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            background: p.color,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            transform: `rotate(${p.rotate}deg)`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

import { BookOpenIcon, RingsIcon, PenIcon, SlidersIcon, HomeIcon } from './Icons';

const ITEMS = [
  { id: 'home',     label: 'Home',     Icon: HomeIcon },
  { id: 'words',    label: 'Words',    Icon: BookOpenIcon },
  { id: 'together', label: 'Together', Icon: RingsIcon },
  { id: 'journal',  label: 'Journal',  Icon: PenIcon },
  { id: 'settings', label: 'Settings', Icon: SlidersIcon },
];

export default function BottomNav({ active, onChange }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
      width: '100%', maxWidth: 500,
      background: 'white',
      borderTop: '1px solid #FDE8EC',
      display: 'flex',
      boxShadow: '0 -4px 20px rgba(92,26,46,0.10)',
      zIndex: 200,
      paddingBottom: 'env(safe-area-inset-bottom)',
    }}>
      {ITEMS.map(item => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 4px 8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isActive ? '#C0556A' : '#B0A0A0',
              transition: 'color 0.2s',
              gap: 4,
              position: 'relative',
            }}
          >
            {isActive && (
              <span style={{
                position: 'absolute',
                top: 0, left: '50%', transform: 'translateX(-50%)',
                width: 28, height: 3, background: '#C0556A', borderRadius: '0 0 3px 3px',
              }} />
            )}
            <item.Icon size={21} color={isActive ? '#C0556A' : '#B0A0A0'} />
            <span style={{
              fontSize: 10,
              fontFamily: 'sans-serif',
              fontWeight: isActive ? '600' : '400',
              letterSpacing: '0.02em',
            }}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

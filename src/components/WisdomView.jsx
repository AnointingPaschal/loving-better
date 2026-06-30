import { useState, useMemo } from 'react';
import { WISDOM, CATEGORIES, getDailyWisdom, getRandomWisdom, getWisdomByCategory, getTypeColor } from '../data/wisdom';
import WisdomCard from './WisdomCard';
import { lsGet, lsSet } from '../utils/storage';

function loadSaved() { return lsGet('lb_wisdom_saved', []); }
function persistSaved(ids) { lsSet('lb_wisdom_saved', ids); }

export default function WisdomView() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedIds, setSavedIds] = useState(loadSaved);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [featuredItem, setFeaturedItem] = useState(getDailyWisdom);

  const daily = getDailyWisdom();

  const handleSave = (id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      persistSaved(next);
      return next;
    });
  };

  const handleShuffle = () => {
    setFeaturedItem(getRandomWisdom([featuredItem.id]));
    setShuffleKey(k => k + 1);
  };

  const filteredItems = useMemo(() => {
    let items = getWisdomByCategory(activeCategory);
    if (showSavedOnly) items = items.filter(w => savedIds.includes(w.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(w =>
        w.text.toLowerCase().includes(q) ||
        (w.author || '').toLowerCase().includes(q)
      );
    }
    return items;
  }, [activeCategory, showSavedOnly, searchQuery, shuffleKey, savedIds]);

  const { bg: featBg, border: featBorder, label: featLabel, labelColor: featLabelColor } = getTypeColor(featuredItem.type);

  return (
    <>
      {/* Word of the Day */}
      <div style={{
        background: 'linear-gradient(145deg, #3D0C18, #7A2240)',
        borderRadius: '14px',
        padding: '20px 18px',
        marginBottom: '16px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* decorative circle */}
        <div style={{ position: 'absolute', right: -30, top: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ fontSize: '10px', opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'sans-serif', marginBottom: '6px' }}>
          Word of the Day ✨
        </div>
        <p style={{ fontSize: '15px', fontStyle: 'italic', lineHeight: 1.7, fontFamily: 'Georgia, serif', margin: '0 0 10px', position: 'relative' }}>
          "{featuredItem.text}"
        </p>
        {featuredItem.author && (
          <p style={{ fontSize: '12px', opacity: 0.7, textAlign: 'right', fontFamily: 'Georgia, serif', margin: '0 0 14px' }}>
            — {featuredItem.author}
          </p>
        )}
        <button
          onClick={handleShuffle}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '20px',
            color: 'white',
            padding: '6px 16px',
            fontSize: '12px',
            cursor: 'pointer',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}
        >
          ↻  Surprise me
        </button>
      </div>

      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          type="text"
          placeholder="Search words & advice…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 40px 10px 14px',
            borderRadius: '10px',
            border: '1px solid #F2A7B3',
            background: 'white',
            fontFamily: 'Georgia, serif',
            fontSize: '13px',
            color: '#2C1A1A',
            outline: 'none',
            boxSizing: 'border-box',
          }}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7A6060', fontSize: '16px' }}
          >×</button>
        )}
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '12px', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              flexShrink: 0,
              padding: '6px 12px',
              borderRadius: '20px',
              border: `1px solid ${activeCategory === cat.id ? '#C0556A' : '#F2A7B3'}`,
              background: activeCategory === cat.id ? '#C0556A' : 'white',
              color: activeCategory === cat.id ? 'white' : '#5C1A2E',
              fontSize: '12px',
              cursor: 'pointer',
              fontFamily: 'Georgia, serif',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Saved toggle + count */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <span style={{ fontSize: '12px', color: '#7A6060', fontFamily: 'sans-serif' }}>
          {filteredItems.length} {filteredItems.length === 1 ? 'word' : 'words'}
        </span>
        <button
          onClick={() => setShowSavedOnly(s => !s)}
          style={{
            background: showSavedOnly ? '#C0556A' : 'white',
            border: '1px solid #C0556A',
            borderRadius: '20px',
            padding: '5px 14px',
            fontSize: '12px',
            cursor: 'pointer',
            color: showSavedOnly ? 'white' : '#C0556A',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            transition: 'all 0.2s',
          }}
        >
          ♥ Saved ({savedIds.length})
        </button>
      </div>

      {/* Cards */}
      {filteredItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: '14px' }}>
          {showSavedOnly
            ? 'No saved words in this category yet.\nTap ♡ on any card to save it.'
            : 'Nothing found. Try a different search.'}
        </div>
      ) : (
        filteredItems.map(item => (
          <WisdomCard
            key={item.id}
            item={item}
            saved={savedIds.includes(item.id)}
            onSave={handleSave}
          />
        ))
      )}

      <div style={{ height: '20px' }} />
    </>
  );
}

import { useState, useMemo, useEffect } from 'react';
import { WISDOM, CATEGORIES, getDailyWisdom, getRandomWisdom, getWisdomByCategory, getTypeColor } from '../data/wisdom';
import WisdomCard from './WisdomCard';
import { lsGet, lsSet } from '../utils/storage';
import { RefreshIcon, SearchIcon, XIcon, HeartIcon, BookOpenIcon, ChevronRightIcon, ChevronDownIcon } from './Icons';

const PAGE_SIZE = 20;

function loadSaved() { return lsGet('lb_wisdom_saved', []); }
function persistSaved(ids) { lsSet('lb_wisdom_saved', ids); }

export default function WisdomView({ settings }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [savedIds, setSavedIds] = useState(loadSaved);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [featured, setFeatured] = useState(getDailyWisdom);
  const [page, setPage] = useState(1);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [activeCategory, searchQuery, showSavedOnly]);

  const handleSave = (id) => {
    setSavedIds(prev => {
      const next = prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id];
      persistSaved(next);
      return next;
    });
  };

  const allFiltered = useMemo(() => {
    let items = getWisdomByCategory(activeCategory);
    if (showSavedOnly) items = items.filter(w => savedIds.includes(w.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(w => w.text.toLowerCase().includes(q) || (w.author || '').toLowerCase().includes(q));
    }
    return items;
  }, [activeCategory, showSavedOnly, searchQuery, savedIds]);

  const totalPages = Math.ceil(allFiltered.length / PAGE_SIZE);
  const pageItems = allFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {/* Featured card */}
      <div style={{ background: 'linear-gradient(145deg, #3D0C18, #7A2240)', borderRadius: 14, padding: '20px 18px', marginBottom: 16, color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <BookOpenIcon size={17} color="#F2A7B3" />
          <span style={{ fontSize: 10, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: 'sans-serif' }}>Word of the Day</span>
        </div>
        <p style={{ fontSize: 15, fontStyle: 'italic', lineHeight: 1.7, fontFamily: 'Georgia, serif', margin: '0 0 10px' }}>
          "{featured.text}"
        </p>
        {featured.author && (
          <p style={{ fontSize: 12, opacity: 0.7, textAlign: 'right', fontFamily: 'Georgia, serif', margin: '0 0 14px' }}>
            -- {featured.author}
          </p>
        )}
        <button
          onClick={() => setFeatured(getRandomWisdom([featured.id]))}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, color: 'white', padding: '6px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          <RefreshIcon size={13} color="white" /> Surprise me
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 12 }}>
        <SearchIcon size={16} color="#B0A0A0" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search 1,000 words and advice..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '10px 40px 10px 38px', borderRadius: 10, border: '1px solid #F2A7B3', background: 'white', fontFamily: 'Georgia, serif', fontSize: 13, color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' }}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <XIcon size={16} color="#7A6060" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 12, scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: 20,
              border: `1px solid ${activeCategory === cat.id ? '#C0556A' : '#F2A7B3'}`,
              background: activeCategory === cat.id ? '#C0556A' : 'white',
              color: activeCategory === cat.id ? 'white' : '#5C1A2E',
              fontSize: 12, cursor: 'pointer', fontFamily: 'Georgia, serif', whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
          >
            {cat.icon} {cat.label}
          </button>
        ))}
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 12, color: '#7A6060', fontFamily: 'sans-serif' }}>
          {allFiltered.length.toLocaleString()} words
          {totalPages > 1 && <span> &middot; page {page}/{totalPages}</span>}
        </span>
        <button
          onClick={() => setShowSavedOnly(s => !s)}
          style={{ display: 'flex', alignItems: 'center', gap: 5, background: showSavedOnly ? '#C0556A' : 'white', border: '1px solid #C0556A', borderRadius: 20, padding: '5px 14px', fontSize: 12, cursor: 'pointer', color: showSavedOnly ? 'white' : '#C0556A', fontFamily: 'Georgia, serif', fontStyle: 'italic', transition: 'all 0.2s' }}
        >
          <HeartIcon size={12} color={showSavedOnly ? 'white' : '#C0556A'} filled={showSavedOnly} />
          Saved ({savedIds.length})
        </button>
      </div>

      {/* Cards */}
      {allFiltered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: 14 }}>
          {showSavedOnly ? 'No saved words in this category.' : 'Nothing found. Try a different search.'}
        </div>
      ) : (
        <>
          {pageItems.map(item => (
            <WisdomCard key={item.id} item={item} saved={savedIds.includes(item.id)} onSave={handleSave} />
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center', padding: '16px 0 8px', flexWrap: 'wrap' }}>
              <button
                disabled={page === 1}
                onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
                style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid #F2A7B3', background: page === 1 ? '#F9F9F9' : 'white', color: page === 1 ? '#D1B8BC' : '#C0556A', fontSize: 13, cursor: page === 1 ? 'default' : 'pointer', fontFamily: 'Georgia, serif' }}
              >
                Previous
              </button>

              {/* Page number dots */}
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                let p;
                if (totalPages <= 7) {
                  p = i + 1;
                } else if (page <= 4) {
                  p = i + 1;
                } else if (page >= totalPages - 3) {
                  p = totalPages - 6 + i;
                } else {
                  p = page - 3 + i;
                }
                return (
                  <button
                    key={p}
                    onClick={() => { setPage(p); window.scrollTo(0, 0); }}
                    style={{
                      width: 34, height: 34, borderRadius: '50%',
                      border: `1px solid ${p === page ? '#C0556A' : '#F2A7B3'}`,
                      background: p === page ? '#C0556A' : 'white',
                      color: p === page ? 'white' : '#5C1A2E',
                      fontSize: 13, cursor: 'pointer', fontFamily: 'sans-serif', fontWeight: p === page ? 'bold' : 'normal',
                    }}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                disabled={page === totalPages}
                onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
                style={{ padding: '8px 16px', borderRadius: 20, border: '1px solid #F2A7B3', background: page === totalPages ? '#F9F9F9' : '#C0556A', color: page === totalPages ? '#D1B8BC' : 'white', fontSize: 13, cursor: page === totalPages ? 'default' : 'pointer', fontFamily: 'Georgia, serif' }}
              >
                Next
              </button>
            </div>
          )}

          <div style={{ textAlign: 'center', fontSize: 11, color: '#B0A0A0', fontFamily: 'sans-serif', paddingBottom: 8 }}>
            Showing {(page - 1) * PAGE_SIZE + 1}--{Math.min(page * PAGE_SIZE, allFiltered.length)} of {allFiltered.length.toLocaleString()}
          </div>
        </>
      )}
      <div style={{ height: 16 }} />
    </>
  );
}

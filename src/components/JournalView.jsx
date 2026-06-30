import { useState } from 'react';
import { lsGet, lsSet } from '../utils/storage';
import { PenIcon, ChevronDownIcon, ChevronUpIcon, XIcon } from './Icons';

function loadJournal() { return lsGet('lb_journal_entries', []); }
function saveJournal(entries) { lsSet('lb_journal_entries', entries); }

const PROMPTS = [
  "What made me feel closest to my partner this week?",
  "What is one thing I am still finding difficult to say out loud?",
  "Where did I fall short this week — and what will I do differently?",
  "What do I most want my partner to know right now?",
  "What fear am I still carrying that I have not fully named?",
  "What does the future I want for us look like in my mind today?",
  "What am I most grateful for about this person?",
  "Where did I show up well this week? Where did I not?",
  "What old pattern did I notice in myself recently?",
  "If I wrote a letter to the version of us 5 years from now, what would I say?",
  "What does God seem to be saying to me about this relationship?",
  "What would change if I fully trusted this process?",
];

function formatEntryDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}

export default function JournalView({ settings }) {
  const [entries, setEntries] = useState(loadJournal);
  const [writing, setWriting] = useState(false);
  const [draftText, setDraftText] = useState('');
  const [promptIdx] = useState(() => Math.floor(Math.random() * PROMPTS.length));
  const [openEntry, setOpenEntry] = useState(null);

  const save = () => {
    if (!draftText.trim()) return;
    const next = [{ id: Date.now(), text: draftText.trim(), created: new Date().toISOString() }, ...entries];
    setEntries(next); saveJournal(next);
    setDraftText(''); setWriting(false);
  };

  const deleteEntry = (id) => {
    const next = entries.filter(e => e.id !== id);
    setEntries(next); saveJournal(next);
    if (openEntry === id) setOpenEntry(null);
  };

  const prompt = PROMPTS[promptIdx];

  return (
    <>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #2C3E50, #3B5068)', borderRadius: 14, padding: '18px 18px', marginBottom: 16, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <PenIcon size={20} color="rgba(255,255,255,0.8)" />
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>Private Journal</div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>Your Reflections</div>
          </div>
        </div>
        <p style={{ fontSize: 13, opacity: 0.8, fontStyle: 'italic', lineHeight: 1.6, marginBottom: 12 }}>
          Writing helps you find what thinking alone cannot. Write for yourself — honestly, without performance.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '12px 14px', marginBottom: 12 }}>
          <div style={{ fontSize: 10, opacity: 0.65, fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 5 }}>Today's prompt</div>
          <div style={{ fontSize: 13, fontStyle: 'italic', lineHeight: 1.6 }}>"{prompt}"</div>
        </div>
        <button onClick={() => setWriting(true)} style={{
          width: '100%', padding: '11px', background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 10, color: 'white',
          fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif', fontStyle: 'italic',
        }}>
          + Write a new entry
        </button>
      </div>

      {/* Write modal */}
      {writing && (
        <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #F2A7B3', boxShadow: '0 4px 20px rgba(92,26,46,0.12)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', fontFamily: 'Georgia, serif' }}>New Entry — {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}</div>
            <button onClick={() => { setWriting(false); setDraftText(''); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <XIcon size={18} color="#7A6060" />
            </button>
          </div>
          <div style={{ fontSize: 11, color: '#C0556A', fontStyle: 'italic', fontFamily: 'Georgia, serif', marginBottom: 8 }}>
            Prompt: {prompt}
          </div>
          <textarea
            autoFocus
            value={draftText}
            onChange={e => setDraftText(e.target.value)}
            placeholder="Write freely…"
            style={{ width: '100%', minHeight: 160, padding: '12px', border: '1px solid #F2A7B3', borderRadius: 10, fontFamily: 'Georgia, serif', fontSize: 14, color: '#2C1A1A', outline: 'none', resize: 'vertical', lineHeight: 1.7, background: '#FFFBF5', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <button onClick={save} style={{ flex: 1, background: '#5C1A2E', border: 'none', borderRadius: 10, padding: '11px', color: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
              Save entry
            </button>
            <button onClick={() => { setWriting(false); setDraftText(''); }} style={{ padding: '11px 18px', background: 'none', border: '1px solid #F2A7B3', borderRadius: 10, color: '#7A6060', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Entries */}
      {entries.length === 0 && !writing && (
        <div style={{ textAlign: 'center', padding: '50px 20px', color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: 14, lineHeight: 1.8 }}>
          No entries yet.<br />Your reflections will appear here.
        </div>
      )}

      {entries.map(entry => {
        const isOpen = openEntry === entry.id;
        const preview = entry.text.slice(0, 100) + (entry.text.length > 100 ? '…' : '');
        return (
          <div key={entry.id} style={{ background: 'white', borderRadius: 12, marginBottom: 10, border: '1px solid #FDE8EC', boxShadow: '0 1px 8px rgba(92,26,46,0.06)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '13px 14px', cursor: 'pointer' }} onClick={() => setOpenEntry(isOpen ? null : entry.id)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#C0556A', fontFamily: 'sans-serif', marginBottom: 5 }}>{formatEntryDate(entry.created)}</div>
                <div style={{ fontSize: 13, fontFamily: 'Georgia, serif', color: '#5C1A2E', fontStyle: 'italic', lineHeight: 1.55 }}>"{preview}"</div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexShrink: 0, marginTop: 2 }}>
                {isOpen ? <ChevronUpIcon size={16} color="#7A6060" /> : <ChevronDownIcon size={16} color="#7A6060" />}
              </div>
            </div>
            {isOpen && (
              <div style={{ borderTop: '1px solid #FDE8EC', padding: '12px 14px', background: '#FFFBF5' }}>
                <p style={{ fontSize: 14, fontFamily: 'Georgia, serif', color: '#2C1A1A', lineHeight: 1.75, margin: '0 0 12px', whiteSpace: 'pre-wrap' }}>{entry.text}</p>
                <button onClick={() => deleteEntry(entry.id)} style={{ background: 'none', border: '1px solid #FDE8EC', borderRadius: 20, padding: '4px 12px', fontSize: 11, color: '#C05454', cursor: 'pointer', fontFamily: 'sans-serif' }}>
                  Delete entry
                </button>
              </div>
            )}
          </div>
        );
      })}
      <div style={{ height: 16 }} />
    </>
  );
}

import { useState, useEffect } from 'react';
import { lsGet, lsSet } from '../utils/storage';
import {
  RefreshIcon, CheckCircleIcon, CircleIcon,
  MessageCircleIcon, ChevronDownIcon, ChevronUpIcon,
  XIcon, AlertCircleIcon, StarIcon
} from './Icons';

// ── OpenRouter config ─────────────────────────────────────────────────────────
const OR_KEY = import.meta.env.VITE_OR_KEY || '';
const PRIMARY_MODEL = 'openai/gpt-oss-120b';
const FALLBACK_MODEL = 'qwen/qwen3-coder';

// ── Storage ───────────────────────────────────────────────────────────────────
function loadTopics() { return lsGet('lb_talk_topics', DEFAULT_TOPICS); }
function saveTopics(t) { lsSet('lb_talk_topics', t); }
function loadDiscussed() { return lsGet('lb_talk_discussed', []); }
function saveDiscussed(d) { lsSet('lb_talk_discussed', d); }

// ── Category colours ──────────────────────────────────────────────────────────
const CAT_COLORS = {
  'Faith':              { color: '#5A7A6E', bg: '#F5FAF8', badge: '#D4EAE2' },
  'Money':              { color: '#B8860B', bg: '#FFFBF0', badge: '#FDF3DC' },
  'Family':             { color: '#7B5EA7', bg: '#F5F0FF', badge: '#E8E0FF' },
  'Communication':      { color: '#C0556A', bg: '#FFF5F7', badge: '#FDE8EC' },
  'Intimacy':           { color: '#9B4F7A', bg: '#FFF0F8', badge: '#FFE0F0' },
  'Career':             { color: '#3B82A0', bg: '#EFF7FC', badge: '#CCE8F4' },
  'Lifestyle':          { color: '#5C6B3E', bg: '#F5F7EF', badge: '#DDE8C4' },
  'Healing':            { color: '#C05454', bg: '#FFF5F5', badge: '#FFE0E0' },
  'Future':             { color: '#5C1A2E', bg: '#FDE8EC', badge: '#F2A7B3' },
  'Conflict':           { color: '#8B4513', bg: '#FFF8F2', badge: '#FFE4C8' },
  'Parenting':          { color: '#2E7D52', bg: '#F0FAF4', badge: '#C8EDD8' },
  'Friendship':         { color: '#4A6FA5', bg: '#EEF4FF', badge: '#CCE0FF' },
};

const depthColor = { 'Light': '#5A7A6E', 'Medium': '#B8860B', 'Deep': '#C0556A' };

// ── Default seed topics (20+) ─────────────────────────────────────────────────
const DEFAULT_TOPICS = [
  { id: 'dt1',  topic: 'How do you see spiritual leadership working in our home — what does it look like day to day, practically?', category: 'Faith', depth: 'Deep' },
  { id: 'dt2',  topic: 'Can we share our full financial picture right now — income, debts, savings, and obligations — without shame or editing?', category: 'Money', depth: 'Deep' },
  { id: 'dt3',  topic: 'What did you learn about love from watching your parents\' relationship, and what do you most want to do differently?', category: 'Healing', depth: 'Deep' },
  { id: 'dt4',  topic: 'When we disagree about something important, what does a fair and healthy resolution look like for both of us?', category: 'Conflict', depth: 'Medium' },
  { id: 'dt5',  topic: 'How many children do you want — and if we disagreed on that number, how would we navigate it?', category: 'Parenting', depth: 'Deep' },
  { id: 'dt6',  topic: 'What does emotional intimacy mean to you — and what would make you feel truly close to me in that way?', category: 'Intimacy', depth: 'Deep' },
  { id: 'dt7',  topic: 'How should we handle financial requests from family members — where is our shared boundary?', category: 'Family', depth: 'Medium' },
  { id: 'dt8',  topic: 'What career ambitions do you have that I may not fully know about, and how can I best support them?', category: 'Career', depth: 'Medium' },
  { id: 'dt9',  topic: 'What does a good week look like in our home — who does what, when, and how do we handle it when one of us is overwhelmed?', category: 'Lifestyle', depth: 'Light' },
  { id: 'dt10', topic: 'What does your ideal daily prayer or spiritual rhythm look like — and how do we build that as a couple?', category: 'Faith', depth: 'Medium' },
  { id: 'dt11', topic: 'Is there anything from your past that you believe I have a right to know before we marry?', category: 'Healing', depth: 'Deep' },
  { id: 'dt12', topic: 'If one of us had to relocate for work, how would we make that decision — whose career takes priority and why?', category: 'Career', depth: 'Deep' },
  { id: 'dt13', topic: 'What does physical intimacy in our marriage need to look like for both of us to feel loved and honoured?', category: 'Intimacy', depth: 'Deep' },
  { id: 'dt14', topic: 'How do you want to handle joint finances — one account, separate, or both — and who manages the day-to-day budget?', category: 'Money', depth: 'Medium' },
  { id: 'dt15', topic: 'What specific patterns from your childhood home are you most afraid of repeating in ours?', category: 'Healing', depth: 'Deep' },
  { id: 'dt16', topic: 'What expectations do your parents or family have of our marriage — and which of those do we accept or reject?', category: 'Family', depth: 'Medium' },
  { id: 'dt17', topic: 'When you are overwhelmed or struggling, what do you need from me — space, presence, words, action?', category: 'Communication', depth: 'Medium' },
  { id: 'dt18', topic: 'What does your ideal social life look like — how much time with friends, family, and alone time do you genuinely need?', category: 'Lifestyle', depth: 'Light' },
  { id: 'dt19', topic: 'In five years, what does our life together look like — where are we, what are we doing, what have we built?', category: 'Future', depth: 'Medium' },
  { id: 'dt20', topic: 'How will we keep our friendship alive when life gets full, stressful, and ordinary?', category: 'Friendship', depth: 'Medium' },
  { id: 'dt21', topic: 'What is the one thing you are most afraid to tell me — and can you tell me now, while it is still early?', category: 'Healing', depth: 'Deep' },
  { id: 'dt22', topic: 'How important is it to you that we attend and serve together in the same church — and what if we disagreed on where?', category: 'Faith', depth: 'Medium' },
  { id: 'dt23', topic: 'What does a healthy argument look like in our relationship — what rules do we both agree on?', category: 'Conflict', depth: 'Medium' },
  { id: 'dt24', topic: 'What specific parenting values — around discipline, education, and faith — do we agree on?', category: 'Parenting', depth: 'Deep' },
  { id: 'dt25', topic: 'Is there anything I do that makes you feel emotionally unsafe — something I may not realise?', category: 'Communication', depth: 'Deep' },
];

// ── OpenRouter API ────────────────────────────────────────────────────────────
async function fetchNewTopics(model, discussedTopics = []) {
  const avoidList = discussedTopics.slice(-10).map(t => t.topic).join('; ');
  const prompt = `You are a relationship counsellor helping a couple prepare for marriage. Generate exactly 15 meaningful, specific discussion topics for them.

Return ONLY a valid JSON array — no markdown, no explanation, no text outside the array.

Format:
[{"id":"1","topic":"...","category":"...","depth":"..."}]

Rules:
- "topic" must be a specific question or conversation starter (not just a topic name)
- "category" must be one of: Faith, Money, Family, Communication, Intimacy, Career, Lifestyle, Healing, Future, Conflict, Parenting, Friendship
- "depth" must be exactly: "Light", "Medium", or "Deep"
- Cover at least 8 different categories
- Questions should be personal, direct, and reveal values/compatibility
- Do not repeat these topics: ${avoidList || 'none yet'}
- Make some questions gentle and some confronting — a realistic mix`;

  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OR_KEY}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://loving-better.app',
      'X-Title': 'Loving Better',
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1200,
      temperature: 0.8,
    }),
  });

  if (!res.ok) throw new Error(`${res.status}`);
  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content || '';
  // Extract JSON array
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) throw new Error('No JSON in response');
  const parsed = JSON.parse(match[0]);
  // Normalise IDs
  return parsed.map((t, i) => ({ ...t, id: `ai_${Date.now()}_${i}` }));
}

// ── Category filter pills ─────────────────────────────────────────────────────
function CategoryPills({ topics, active, onChange }) {
  const cats = ['All', ...Array.from(new Set(topics.map(t => t.category))).sort()];
  return (
    <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'none' }}>
      {cats.map(c => (
        <button key={c} onClick={() => onChange(c)} style={{
          flexShrink: 0, padding: '5px 12px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
          fontFamily: 'sans-serif', whiteSpace: 'nowrap', transition: 'all 0.2s',
          border: `1px solid ${active === c ? '#C0556A' : '#F2A7B3'}`,
          background: active === c ? '#C0556A' : 'white',
          color: active === c ? 'white' : '#5C1A2E',
        }}>{c}</button>
      ))}
    </div>
  );
}

// ── Single topic row ──────────────────────────────────────────────────────────
function TopicRow({ topic, onCheck, onUncheck, isDiscussed }) {
  const [open, setOpen] = useState(false);
  const cat = CAT_COLORS[topic.category] || CAT_COLORS['Communication'];
  const dc = depthColor[topic.depth] || '#888';
  const dateStr = topic.discussedAt
    ? new Date(topic.discussedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : null;

  return (
    <div style={{ background: 'white', borderRadius: 12, marginBottom: 8, border: `1px solid ${cat.color}22`, boxShadow: '0 1px 6px rgba(92,26,46,0.06)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', cursor: 'pointer' }}
        onClick={() => !isDiscussed && setOpen(o => !o)}>

        {/* Check button */}
        <button
          onClick={e => { e.stopPropagation(); isDiscussed ? onUncheck(topic) : onCheck(topic); }}
          style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 0, marginTop: 1 }}
        >
          {isDiscussed
            ? <CheckCircleIcon size={22} color={cat.color} fill={cat.color} />
            : <CircleIcon size={22} color="#D1B8BC" />
          }
        </button>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 5, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 10, fontFamily: 'sans-serif', fontWeight: 'bold', color: cat.color, background: cat.badge, borderRadius: 10, padding: '2px 8px' }}>
              {topic.category}
            </span>
            <span style={{ fontSize: 10, fontFamily: 'sans-serif', color: dc, background: `${dc}18`, borderRadius: 10, padding: '2px 8px' }}>
              {topic.depth}
            </span>
            {dateStr && (
              <span style={{ fontSize: 10, fontFamily: 'sans-serif', color: '#7A6060' }}>
                {dateStr}
              </span>
            )}
          </div>
          <p style={{
            fontSize: 13.5, fontFamily: 'Georgia, serif', color: isDiscussed ? '#7A6060' : '#2C1A1A',
            lineHeight: 1.55, margin: 0,
            textDecoration: isDiscussed ? 'none' : 'none',
            overflow: 'hidden',
            display: '-webkit-box', WebkitLineClamp: open ? 'unset' : 3, WebkitBoxOrient: 'vertical',
          }}>
            {topic.topic}
          </p>
        </div>

        {!isDiscussed && (
          <span style={{ flexShrink: 0, marginTop: 2 }}>
            {open ? <ChevronUpIcon size={15} color="#7A6060" /> : <ChevronDownIcon size={15} color="#7A6060" />}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Main TalkView ─────────────────────────────────────────────────────────────
export default function TalkView({ settings }) {
  const [subTab, setSubTab] = useState('discuss');
  const [topics, setTopics] = useState(loadTopics);
  const [discussed, setDiscussed] = useState(loadDiscussed);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [modelUsed, setModelUsed] = useState('');

  const him = settings?.himName || 'Him';
  const her = settings?.herName || 'Her';

  const undiscussedIds = new Set(discussed.map(d => d.id));
  const activeTopics = topics.filter(t => !undiscussedIds.has(t.id));
  const filteredTopics = catFilter === 'All' ? activeTopics : activeTopics.filter(t => t.category === catFilter);

  const handleCheck = (topic) => {
    const entry = { ...topic, discussedAt: new Date().toISOString() };
    const newDiscussed = [entry, ...discussed];
    setDiscussed(newDiscussed);
    saveDiscussed(newDiscussed);
  };

  const handleUncheck = (topic) => {
    const newDiscussed = discussed.filter(d => d.id !== topic.id);
    setDiscussed(newDiscussed);
    saveDiscussed(newDiscussed);
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError('');
    setModelUsed('');
    let newTopics = null;

    try {
      newTopics = await fetchNewTopics(PRIMARY_MODEL, discussed);
      setModelUsed(PRIMARY_MODEL.split('/')[1]);
    } catch (e) {
      try {
        newTopics = await fetchNewTopics(FALLBACK_MODEL, discussed);
        setModelUsed(FALLBACK_MODEL.split('/')[1]);
      } catch (e2) {
        setError('Could not connect. Check your network and try again.');
        setLoading(false);
        return;
      }
    }

    if (newTopics && newTopics.length > 0) {
      // Merge: keep discussed ones out, add new ones
      const merged = [...newTopics, ...DEFAULT_TOPICS.filter(d => !newTopics.find(n => n.category === d.category))];
      setTopics(merged);
      saveTopics(merged);
      setCatFilter('All');
    }
    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg, #1A2942, #2C3E6B)', borderRadius: 14, padding: '18px 18px', marginBottom: 16, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <MessageCircleIcon size={20} color="rgba(255,255,255,0.8)" />
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>
              {him} & {her}
            </div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>Things to Talk About</div>
          </div>
        </div>
        <p style={{ fontSize: 13, opacity: 0.8, fontStyle: 'italic', lineHeight: 1.65, marginBottom: 12 }}>
          "The conversations you have before marriage determine the life you build inside it. Have them now."
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{activeTopics.length}</div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif' }}>to discuss</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{discussed.length}</div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif' }}>discussed</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{topics.length + discussed.length}</div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif' }}>total topics</div>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', background: '#F5EDE4', borderRadius: 12, padding: 4, marginBottom: 16, gap: 4 }}>
        {['discuss', 'discussed'].map(t => (
          <button key={t} onClick={() => setSubTab(t)} style={{
            flex: 1, padding: '10px 8px', borderRadius: 10, border: 'none',
            background: subTab === t ? 'white' : 'transparent',
            color: subTab === t ? '#5C1A2E' : '#7A6060',
            fontFamily: 'Georgia, serif', fontSize: 13, cursor: 'pointer',
            fontWeight: subTab === t ? 'bold' : 'normal',
            boxShadow: subTab === t ? '0 1px 4px rgba(92,26,46,0.12)' : 'none',
            transition: 'all 0.2s', textTransform: 'capitalize',
          }}>
            {t === 'discuss' ? `Discuss (${activeTopics.length})` : `Discussed (${discussed.length})`}
          </button>
        ))}
      </div>

      {/* ── DISCUSS TAB ── */}
      {subTab === 'discuss' && (
        <>
          {/* Refresh button */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <CategoryPills topics={activeTopics} active={catFilter} onChange={setCatFilter} />
            <button
              onClick={handleRefresh}
              disabled={loading}
              style={{
                flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6,
                background: loading ? '#F5EDE4' : '#5C1A2E',
                border: 'none', borderRadius: 20, padding: '8px 14px',
                color: loading ? '#7A6060' : 'white', fontSize: 12,
                cursor: loading ? 'default' : 'pointer',
                fontFamily: 'Georgia, serif', fontStyle: 'italic', marginLeft: 8, flexShrink: 0,
                transition: 'all 0.2s',
              }}
            >
              <RefreshIcon size={14} color={loading ? '#7A6060' : 'white'}
                style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
              {loading ? 'Getting...' : 'New topics'}
            </button>
          </div>

          {/* Error */}
          {error && (
            <div style={{ display: 'flex', gap: 8, background: '#FFF5F5', border: '1px solid #FCA5A5', borderRadius: 10, padding: '10px 14px', marginBottom: 12 }}>
              <AlertCircleIcon size={16} color="#C05454" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 13, color: '#C05454', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>{error}</span>
            </div>
          )}

          {/* Model badge */}
          {modelUsed && !loading && (
            <div style={{ fontSize: 10, color: '#B0A0A0', fontFamily: 'sans-serif', textAlign: 'right', marginBottom: 8 }}>
              Generated by {modelUsed}
            </div>
          )}

          {/* Loading skeleton */}
          {loading && (
            <div style={{ padding: '30px 0', textAlign: 'center' }}>
              <div style={{ display: 'inline-block', width: 32, height: 32, border: '3px solid #FDE8EC', borderTopColor: '#C0556A', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <p style={{ fontSize: 13, color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif', marginTop: 12 }}>
                Generating new discussion topics...
              </p>
            </div>
          )}

          {!loading && filteredTopics.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif' }}>
              {activeTopics.length === 0
                ? 'All topics discussed! Tap "New topics" to get more.'
                : 'No topics in this category.'}
            </div>
          )}

          {!loading && filteredTopics.map(topic => (
            <TopicRow key={topic.id} topic={topic} onCheck={handleCheck} isDiscussed={false} />
          ))}

          {!loading && filteredTopics.length > 0 && (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <button
                onClick={handleRefresh}
                disabled={loading}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: '1px dashed #C0556A', borderRadius: 20, padding: '8px 20px', color: '#C0556A', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
              >
                <RefreshIcon size={14} color="#C0556A" /> Generate new topics with AI
              </button>
            </div>
          )}
        </>
      )}

      {/* ── DISCUSSED TAB ── */}
      {subTab === 'discussed' && (
        <>
          {discussed.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px 20px' }}>
              <CheckCircleIcon size={44} color="#D4EAE2" />
              <p style={{ fontSize: 14, color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif', marginTop: 14, lineHeight: 1.7 }}>
                No topics marked as discussed yet.{'\n'}Go to Discuss and check off conversations you have had.
              </p>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 12, color: '#7A6060', fontFamily: 'sans-serif', marginBottom: 12, textAlign: 'right' }}>
                {discussed.length} conversation{discussed.length !== 1 ? 's' : ''} completed
              </div>

              {/* Progress bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'sans-serif', color: '#7A6060', marginBottom: 5 }}>
                  <span>Progress</span>
                  <span>{Math.round((discussed.length / (discussed.length + activeTopics.length)) * 100)}%</span>
                </div>
                <div style={{ height: 6, background: '#FDE8EC', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 10, background: 'linear-gradient(90deg, #5A7A6E, #C0556A)',
                    width: `${Math.round((discussed.length / (discussed.length + activeTopics.length)) * 100)}%`,
                    transition: 'width 0.5s',
                  }} />
                </div>
              </div>

              {discussed.map(topic => (
                <TopicRow key={topic.id} topic={topic} onUncheck={handleUncheck} isDiscussed={true} />
              ))}

              <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                <button
                  onClick={() => { if (window.confirm('Move all discussed topics back to the Discuss tab?')) { setDiscussed([]); saveDiscussed([]); } }}
                  style={{ background: 'none', border: '1px solid #FDE8EC', borderRadius: 20, padding: '8px 18px', color: '#B0A0A0', fontSize: 12, cursor: 'pointer', fontFamily: 'sans-serif' }}
                >
                  Clear all discussed
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* Spinner CSS */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <div style={{ height: 20 }} />
    </>
  );
}

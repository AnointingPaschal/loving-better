import { useState } from 'react';
import { lsGet, lsSet } from '../utils/storage';
import {
  MessageCircleIcon, ShieldIcon, TargetIcon, GiftIcon,
  MapPinIcon, CrossIcon, UsersIcon, HomeIcon,
  CheckCircleIcon, CircleIcon, ChevronDownIcon, ChevronUpIcon,
  HeartIcon, LockIcon, AlertCircleIcon, PenIcon
} from './Icons';

function loadTogetherData() {
  return lsGet('lb_together', { discussed: {}, goals: [], notes: {} });
}
function saveTogetherData(data) { lsSet('lb_together', data); }

const PREMARITAL_SECTIONS = [
  {
    id: 'faith',
    title: 'Faith & Spiritual Life',
    Icon: CrossIcon,
    color: '#5A7A6E',
    bg: '#F5FAF8',
    topics: [
      { id: 'f1', text: 'What does spiritual leadership look like in our home?' },
      { id: 'f2', text: 'Which church will we call home together — and are we both committed to it?' },
      { id: 'f3', text: 'How will we pray together daily as a married couple?' },
      { id: 'f4', text: 'How do we handle seasons when one person\'s faith is weaker?' },
      { id: 'f5', text: 'What role does fasting, tithing, and ministry play in our household?' },
      { id: 'f6', text: 'How will we raise our children in faith?' },
    ],
  },
  {
    id: 'communication',
    title: 'Communication & Conflict',
    Icon: MessageCircleIcon,
    color: '#C0556A',
    bg: '#FFF5F7',
    topics: [
      { id: 'co1', text: 'What are the specific patterns we are committing to break before we marry?' },
      { id: 'co2', text: 'What is our agreement when a conversation escalates — who calls the pause?' },
      { id: 'co3', text: 'Who is our trusted couple or counsellor we will go to when we are stuck?' },
      { id: 'co4', text: 'What topics are we each most afraid to bring up — and why?' },
      { id: 'co5', text: 'How long will we allow something to go unresolved before we both commit to addressing it?' },
      { id: 'co6', text: 'What does "asking for help" look like in our marriage — who do we go to?' },
    ],
  },
  {
    id: 'money',
    title: 'Money & Finances',
    Icon: ShieldIcon,
    color: '#B8860B',
    bg: '#FFFBF0',
    topics: [
      { id: 'm1', text: 'Have we both shared our full financial picture — income, debts, savings, obligations?' },
      { id: 'm2', text: 'Joint account, separate accounts, or both — what is our structure?' },
      { id: 'm3', text: 'Who manages the household budget day to day?' },
      { id: 'm4', text: 'What is the amount where both partners must agree before spending?' },
      { id: 'm5', text: 'What are our financial goals for year 1, year 3, year 5 of marriage?' },
      { id: 'm6', text: 'How do we handle giving, tithing, and supporting family members financially?' },
      { id: 'm7', text: 'What is our plan for clearing any existing debts before or after marriage?' },
    ],
  },
  {
    id: 'family',
    title: 'Family & Children',
    Icon: UsersIcon,
    color: '#7B5EA7',
    bg: '#F5F0FF',
    topics: [
      { id: 'fa1', text: 'How many children do we both genuinely want — and are we aligned?' },
      { id: 'fa2', text: 'What are our shared values around parenting — discipline, education, faith?' },
      { id: 'fa3', text: 'How do we handle extended family — boundaries, visits, involvement in our decisions?' },
      { id: 'fa4', text: 'What have we each learned from our families that we want to carry forward? What do we want to leave behind?' },
      { id: 'fa5', text: 'How will we handle a season of infertility or loss, if it comes?' },
      { id: 'fa6', text: 'Who decides when — if both of us are working — one parent stays home with children?' },
    ],
  },
  {
    id: 'roles',
    title: 'Roles & Home Life',
    Icon: HomeIcon,
    color: '#3B82A0',
    bg: '#EFF7FC',
    topics: [
      { id: 'r1', text: 'What does household responsibility look like — who does what, and how is it decided?' },
      { id: 'r2', text: 'How do we handle it when one person is overwhelmed with work and cannot carry their share?' },
      { id: 'r3', text: 'What does the first year of marriage look like logistically — where do we live, what changes?' },
      { id: 'r4', text: 'How do we both feel about careers — whose career takes priority when they conflict?' },
      { id: 'r5', text: 'What does a good week at home look like — what rhythms do we want to establish?' },
      { id: 'r6', text: 'What are our expectations around socialising, alone time, and time with friends?' },
    ],
  },
  {
    id: 'healing',
    title: 'Healing Before "I Do"',
    Icon: AlertCircleIcon,
    color: '#C05454',
    bg: '#FFF5F5',
    topics: [
      { id: 'h1', text: 'What wounds from before this relationship are we each still carrying — and actively addressing?' },
      { id: 'h2', text: 'Have we resolved the specific patterns that hurt us in this relationship — not just agreed to try, but actually changed?' },
      { id: 'h3', text: 'Have we completed or committed to premarital counselling?' },
      { id: 'h4', text: 'Is there anything from our individual histories the other person has a right to know before we marry?' },
      { id: 'h5', text: 'Are we marrying to escape something, or are we genuinely ready to build something?' },
      { id: 'h6', text: 'What does "ready to marry" look like for each of us — specifically, not romantically?' },
    ],
  },
  {
    id: 'intimacy',
    title: 'Intimacy & Marriage',
    Icon: LockIcon,
    color: '#9B4F7A',
    bg: '#FFF0F8',
    topics: [
      { id: 'i1', text: 'Have we had an honest conversation about our expectations for physical intimacy in marriage?' },
      { id: 'i2', text: 'What does emotional intimacy look like for each of us — what do we each need more of?' },
      { id: 'i3', text: 'How will we protect the intimacy of our marriage — from distraction, from other people, from neglect?' },
      { id: 'i4', text: 'Have we discussed any past experiences that might affect how we experience intimacy in marriage?' },
    ],
  },
];

const MILESTONES = [
  { id: 'ms1', text: 'Complete at least 3 months of this daily/weekly tracker together' },
  { id: 'ms2', text: 'Attend premarital counselling (minimum 6 sessions with a trained counsellor or pastor)' },
  { id: 'ms3', text: 'Have every premarital conversation in this section — honestly, not performatively' },
  { id: 'ms4', text: 'Share our full financial pictures with each other — income, debts, obligations, savings' },
  { id: 'ms5', text: 'Choose and commit to a church home together before marriage' },
  { id: 'ms6', text: 'Introduce each other formally to immediate family with intention and clarity' },
  { id: 'ms7', text: 'Agree on where we will live and the plan for the first year of marriage' },
  { id: 'ms8', text: 'Have a conversation about healing — and both genuinely commit to ongoing personal growth' },
  { id: 'ms9', text: 'Create a household budget together and agree on financial roles' },
  { id: 'ms10', text: 'Write each other a letter: who you are choosing, who you are committing to become, and why' },
];

export default function TogetherView() {
  const [data, setData] = useState(loadTogetherData);
  const [openSection, setOpenSection] = useState('faith');
  const [newGoal, setNewGoal] = useState('');
  const [activeTab, setActiveTab] = useState('topics');

  const toggleDiscussed = (id) => {
    const next = { ...data, discussed: { ...data.discussed, [id]: !data.discussed[id] } };
    setData(next); saveTogetherData(next);
  };

  const addGoal = () => {
    if (!newGoal.trim()) return;
    const next = { ...data, goals: [...data.goals, { id: Date.now(), text: newGoal.trim(), done: false, created: new Date().toISOString() }] };
    setData(next); saveTogetherData(next);
    setNewGoal('');
  };

  const toggleGoal = (id) => {
    const next = { ...data, goals: data.goals.map(g => g.id === id ? { ...g, done: !g.done } : g) };
    setData(next); saveTogetherData(next);
  };

  const deleteGoal = (id) => {
    const next = { ...data, goals: data.goals.filter(g => g.id !== id) };
    setData(next); saveTogetherData(next);
  };

  const totalTopics = PREMARITAL_SECTIONS.reduce((a, s) => a + s.topics.length, 0);
  const discussedCount = Object.values(data.discussed).filter(Boolean).length;
  const milestonesDone = MILESTONES.filter(m => data.discussed[m.id]).length;

  const tabs = [
    { id: 'topics',     label: 'Conversations' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'goals',      label: 'Our Goals' },
  ];

  return (
    <>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(145deg, #3D0C18, #6B2D3E)', borderRadius: 14, padding: '20px 18px', marginBottom: 16, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <HeartIcon size={22} color="#F2A7B3" filled />
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>Doing Life Together</div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>Going Towards Marriage</div>
          </div>
        </div>
        <p style={{ fontSize: 13, opacity: 0.82, fontStyle: 'italic', lineHeight: 1.65, marginBottom: 14 }}>
          "Do not rush the preparation. The conversations you have before marriage determine the life you build inside it."
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{discussedCount}</div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif' }}>topics discussed</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{totalTopics - discussedCount}</div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif' }}>still to cover</div>
          </div>
          <div style={{ flex: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 'bold' }}>{milestonesDone}/{MILESTONES.length}</div>
            <div style={{ fontSize: 10, opacity: 0.7, fontFamily: 'sans-serif' }}>milestones</div>
          </div>
        </div>
      </div>

      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            flex: 1, padding: '9px 4px', borderRadius: 10, border: `1px solid ${activeTab === t.id ? '#C0556A' : '#F2A7B3'}`,
            background: activeTab === t.id ? '#C0556A' : 'white', color: activeTab === t.id ? 'white' : '#5C1A2E',
            fontSize: 12, cursor: 'pointer', fontFamily: 'Georgia, serif', fontWeight: activeTab === t.id ? 'bold' : 'normal', transition: 'all 0.2s',
          }}>{t.label}</button>
        ))}
      </div>

      {/* CONVERSATIONS */}
      {activeTab === 'topics' && (
        <>
          <div className="info-banner" style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <MessageCircleIcon size={16} color="#C0556A" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>Mark a topic as discussed once you have genuinely talked through it — not just mentioned it. These conversations build the foundation.</span>
          </div>
          {PREMARITAL_SECTIONS.map(section => {
            const sectionDone = section.topics.filter(t => data.discussed[t.id]).length;
            const isOpen = openSection === section.id;
            return (
              <div key={section.id} className="section-card" style={{ borderColor: `${section.color}30`, marginBottom: 12 }}>
                <div className="section-header" onClick={() => setOpenSection(isOpen ? null : section.id)}>
                  <div className="section-title" style={{ gap: 10 }}>
                    <section.Icon size={18} color={section.color} />
                    <span style={{ fontSize: 13 }}>{section.title}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className={`section-count ${sectionDone === section.topics.length ? 'complete' : sectionDone > 0 ? 'partial' : 'empty'}`}>
                      {sectionDone}/{section.topics.length}
                    </span>
                    {isOpen ? <ChevronUpIcon size={16} color="#7A6060" /> : <ChevronDownIcon size={16} color="#7A6060" />}
                  </div>
                </div>
                <div style={{ height: 2, background: `linear-gradient(90deg, ${section.color}, ${section.color}33)` }} />
                {isOpen && (
                  <div style={{ background: section.bg, padding: '4px 16px 12px' }}>
                    {section.topics.map(topic => {
                      const done = !!data.discussed[topic.id];
                      return (
                        <button key={topic.id} className="check-item" onClick={() => toggleDiscussed(topic.id)}>
                          {done
                            ? <CheckCircleIcon size={20} color={section.color} fill={section.color} style={{ flexShrink: 0, marginTop: 1 }} />
                            : <CircleIcon size={20} color="#D1B8BC" style={{ flexShrink: 0, marginTop: 1 }} />
                          }
                          <span className={`check-text ${done ? 'done' : ''}`}>{topic.text}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* MILESTONES */}
      {activeTab === 'milestones' && (
        <>
          <div className="pull-quote">
            <p>"Every milestone is a proof that you are serious about what you are building — not just what you are feeling."</p>
          </div>
          <div className="section-card" style={{ borderColor: '#C0556A30' }}>
            <div style={{ height: 3, background: 'linear-gradient(90deg, #5C1A2E, #5C1A2E44)' }} />
            <div style={{ padding: '14px 16px 8px' }}>
              <div style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', marginBottom: 10 }}>Before You Say "I Do"</div>
              {MILESTONES.map(m => {
                const done = !!data.discussed[m.id];
                return (
                  <button key={m.id} className="check-item" onClick={() => toggleDiscussed(m.id)}>
                    {done
                      ? <CheckCircleIcon size={20} color="#C0556A" fill="#C0556A" style={{ flexShrink: 0, marginTop: 1 }} />
                      : <CircleIcon size={20} color="#D1B8BC" style={{ flexShrink: 0, marginTop: 1 }} />
                    }
                    <span className={`check-text ${done ? 'done' : ''}`}>{m.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* OUR GOALS */}
      {activeTab === 'goals' && (
        <>
          <div className="info-banner" style={{ display: 'flex', gap: 10 }}>
            <TargetIcon size={16} color="#B8860B" style={{ flexShrink: 0, marginTop: 2 }} />
            <span>Add your shared goals — things you are building toward together. Financial, spiritual, relational, life. Mark them when you reach them.</span>
          </div>

          {/* Add goal */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
            <input
              value={newGoal}
              onChange={e => setNewGoal(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addGoal()}
              placeholder="Add a shared goal…"
              style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1px solid #F2A7B3', fontFamily: 'Georgia, serif', fontSize: 13, color: '#2C1A1A', outline: 'none', background: 'white' }}
            />
            <button onClick={addGoal} style={{ background: '#C0556A', border: 'none', borderRadius: 10, padding: '10px 16px', color: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
              Add
            </button>
          </div>

          {data.goals.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#7A6060', fontStyle: 'italic', fontFamily: 'Georgia, serif', fontSize: 14 }}>
              No shared goals yet.<br />Add the first one above.
            </div>
          )}

          {data.goals.map(goal => (
            <div key={goal.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'white', borderRadius: 12, padding: '12px 14px', marginBottom: 8, border: '1px solid #FDE8EC', boxShadow: '0 1px 6px rgba(92,26,46,0.06)' }}>
              <button onClick={() => toggleGoal(goal.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 1, flexShrink: 0 }}>
                {goal.done
                  ? <CheckCircleIcon size={22} color="#5A7A6E" fill="#5A7A6E" />
                  : <CircleIcon size={22} color="#D1B8BC" />
                }
              </button>
              <span style={{ flex: 1, fontSize: 13.5, fontFamily: 'Georgia, serif', color: goal.done ? '#7A6060' : '#2C1A1A', textDecoration: goal.done ? 'line-through' : 'none', lineHeight: 1.5, paddingTop: 1 }}>
                {goal.text}
              </span>
              <button onClick={() => deleteGoal(goal.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D1B8BC', padding: '0 2px', flexShrink: 0 }}>
                <XIcon size={15} color="#D1B8BC" />
              </button>
            </div>
          ))}
        </>
      )}
      <div style={{ height: 16 }} />
    </>
  );
}

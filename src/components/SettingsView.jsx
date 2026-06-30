import { useState } from 'react';
import { lsGet, lsSet } from '../utils/storage';
import { UserIcon, HeartIcon, AlertCircleIcon, InfoIcon, SlidersIcon, ChevronRightIcon, ChevronDownIcon } from './Icons';

export function loadSettings() {
  return lsGet('lb_settings', { himName: 'Him', herName: 'Her', showScriptures: true });
}

// ── 1000+ word paginated about content ────────────────────────────────────────
const ABOUT_PAGES = [
  {
    title: 'Why This App Exists',
    content: `This app was not built in a boardroom. It was not designed by a team of product managers who studied relationship trends and wrote a brief. It was built because two real people sat down one afternoon and had the most honest, painful, necessary conversation of their relationship — and chose to stay in the room when it would have been easier to walk out.

That conversation cost them something. It cost comfort, and the illusion that things were fine, and the quiet agreement both people sometimes make to leave certain things unsaid. But it gave them something far more valuable than comfort: the truth about where they were, what had broken, what each of them needed, and what it would take to build something real.

This app exists for that couple. And for every other couple who recognises themselves in that story. For every two people who love each other genuinely and have still, somehow, managed to hurt each other deeply. For every person who has lain awake wondering whether the relationship they are in is the one they were meant for — not because the love is gone, but because something in the way they are doing it is not working.

If that is you — if you are reading this because you are trying — then this app is for you. Not to fix you. Not to manage you. But to walk beside you as you do the hardest and most worthwhile work available to a human being: learning to love someone well.`,
  },
  {
    title: 'The Truth About Love Nobody Tells You',
    content: `The version of love that culture sells us is a feeling — electric, consuming, effortless. It arrives like weather and you fall into it, and the falling itself is the evidence that the love is real. What nobody tells you is what happens when the falling stops. When you land. When you are standing in the ordinary Tuesday of a relationship — tired, misunderstood, carrying something you have not said yet — and the feeling is quiet.

Here is what nobody tells you: that is not the end of love. That is where love actually begins.

The love that survives Tuesday is a different thing entirely from the love that felt like electricity in the beginning. It is not inferior — it is more. It is the love that says: I see you on your worst day and I am still here. I know the version of you that disappoints me and I still choose the version of you that does not. I have been hurt by you and I have decided that who you are becoming matters more than what you have done.

That love is not a feeling. It is a decision made daily, in small and specific acts, in the choice to stay in the conversation rather than leave it, in the willingness to say the hard thing and then hold the person you said it to. It is the most unglamorous and most important thing you will ever do.`,
  },
  {
    title: 'For Paschal',
    content: `You are not a man who does not love her. You are a man who has not yet fully learned to show her that you do in the language she can receive it. That distinction matters enormously, because one is a problem of character and one is a problem of practice — and practice can be changed.

The silence you carry is not strength. It feels like strength, because it keeps the surface smooth and the peace maintained. But she does not experience it as strength. She experiences it as absence. She experiences it as being kept at arm's length from the person she chose. Every time you absorb rather than address, every time you let something pass rather than name it, you are making a deposit into an account of unspoken things that will eventually demand to be reckoned with.

You have more capacity than you have been using. You know this. The words exist inside you — she has heard them when the moment was right, when the reconciliation opened something up. The task is not to become a different man. The task is to stop waiting for the moment to be right and to make the moment right by speaking anyway.

She does not need you to be perfect. She needs you to be present. Those are different things, and the second one is available to you today, in this conversation, in the way you greet her when she walks in, in the specific thing you name about her that you have been noticing but have not said.

Begin. The beginning is the only part you have to decide. The rest follows.`,
  },
  {
    title: 'For Doris',
    content: `You are a woman of rare and specific value. Not in the general, greeting-card sense — in the particular sense. Your perceptiveness, your directness, your refusal to accept less than the truth, your capacity to love completely when you feel safe enough to — these are not ordinary qualities. They are the kind that build something lasting, if given the right conditions.

The conditions have not always been right. You have been in a relationship where your needs were met inconsistently, where the emotional presence you required arrived in bursts rather than steadily, where you found yourself carrying things alone that you should have been able to put down together. That history is real. Its effects on you are legitimate. You are not overreacting.

But here is the thing worth holding: the history is not the verdict. The patterns you grew up watching in your parents' marriage are a warning, not a sentence. You get to write something different. And you are already writing it — by being here, by saying the thing, by refusing to let the relationship calcify in silence the way so many do.

What you will need, going forward, is the willingness to stay open even when closing feels safer. Not naively — with your eyes clear and your discernment intact. But open. Because the version of you that is fully loved and fully known is waiting on the other side of that openness, and she deserves to exist.`,
  },
  {
    title: 'Communication Is Everything',
    content: `If you asked every couple who has ever fallen apart what went wrong, the answer would almost always trace back to the same root: something went unsaid for too long. Not the dramatic unsaid things — the quiet ones. The small hurt that was swallowed because the timing was wrong. The need that was whispered so softly it was never heard. The fear that was never named because naming it felt like weakness.

Communication in a relationship is not just the conversations you have. It is the culture you build around honesty. It is the unspoken agreement about whether it is safe to bring hard things here. And that culture is built — or destroyed — in the small moments. In whether you respond to a concern with curiosity or defensiveness. In whether a pause in a hard conversation becomes a return or a retreat. In whether the person who raises something difficult feels heard at the end or silenced.

The specific practice that changes everything: before you respond in a difficult conversation, repeat back what you heard. "What I'm hearing you say is..." That one habit, done consistently, eliminates most of the fighting about what was actually said. It tells the other person that they have been received. And being received — truly, accurately, without distortion — is what most people are desperate for when they raise something hard. They do not necessarily need you to agree. They need to know they were heard.

Build the habit. Start tonight. Ask one real question and listen to the full answer before you form yours.`,
  },
  {
    title: 'On Trust and Keeping Your Word',
    content: `Trust is the most slowly built and most quickly destroyed thing in a relationship. It takes months of consistent small acts to establish it, and it can be significantly damaged in a single moment of inconsistency. This asymmetry is not fair. It is, however, the reality that every couple must navigate.

The most common way trust erodes in a relationship is not through dramatic betrayal. It is through the accumulation of small inconsistencies — promises made in emotional moments that do not survive contact with ordinary life, commitments offered during reconciliation that are quietly forgotten once the crisis passes, patterns identified and apologised for that reappear unchanged within weeks.

Each of these, on its own, seems small. Together, they form a picture. And the person watching that picture form begins to draw a conclusion: that the words cannot be relied upon. That the only information available is the behaviour. And the behaviour, in those moments, is inconsistency.

The way out of this is simple and unglamorous: do what you say you will do. Not dramatically. Not with grand announcements. Just quietly, consistently, without requiring recognition for it. Write down what you commit to. Make the commitments small enough to keep. Keep them. Then keep them again. Trust is not rebuilt in a conversation. It is rebuilt in the gap between a promise made and a promise kept — that gap, filled over and over with follow-through, becomes the foundation of a new security.`,
  },
  {
    title: 'Healing the Things You Carried In',
    content: `Every person who enters a relationship brings their history with them. The childhood that shaped their understanding of love. The parents whose marriage taught them, for better or worse, what to expect from a partner. The previous hurts that left specific marks in specific places, marks that become sensitive when the relationship applies pressure there.

None of this is a flaw. It is being human. But it does mean that some of what happens between two people in a relationship is not actually about each other — it is about the wounds each person carried in. The argument that escalates far beyond what the situation warrants. The defensiveness that appears where none is called for. The shutdown that happens in response to a tone, not a content. These are often old things wearing new clothes.

The most loving thing you can do for your partner is to actively pursue the healing of your own wounds — not instead of loving them, but as an act of love. Because unhealed wounds wound others. Not always deliberately. But consistently. The pain you have not processed will show up in this relationship, in ways you may not even recognise until someone names them.

Seek help if you need it. A counsellor, a pastor, a mentor who has built what you are trying to build. Healing is not a sign of weakness. It is the preparation of a person who takes seriously the life they are trying to build.`,
  },
  {
    title: 'Faith, Prayer, and Building With God',
    content: `For a couple who believes, the spiritual dimension of a relationship is not peripheral — it is foundational. The love described in scripture is not a description of what people naturally do. It is a vision of what they are invited to become, by grace, through the slow and daily work of choosing each other the way they have been chosen.

That means the resources available to you are not limited to your own strength, your own patience, your own capacity for forgiveness. You can draw on something larger. When your own love feels insufficient — when you have reached the end of what you can generate from within yourself and the other person still needs more — you have access to a love that does not run out.

Pray together. Not as a performance, not as a ritual that sits on top of the relationship without touching it. But as the act of bringing the actual state of things — the actual fears, the actual failures, the actual distance — before the One who can do something about it. There is a particular intimacy in praying with your partner. It is the act of letting them hear you speak honestly to God, which means letting them into the parts of you that you only visit when no one is watching. Do not underestimate what that kind of shared vulnerability does to a relationship.

Two are better than one. Not because it is easier — it is not always easier. But because when one falls, the other is there. That is the design. Trust it.`,
  },
  {
    title: 'Going Towards Marriage',
    content: `Marriage is not the destination. It is the beginning of a longer, harder, more beautiful road. The couples who understand this — who go into marriage not as the achievement of something but as the commitment to something — are the ones who build lives worth building.

The preparation matters more than the wedding. Everything you do in this season — the conversations you have, the patterns you interrupt, the counselling you attend, the honesty you practice — is the foundation. And the foundation determines everything. You cannot build something lasting on ground that has not been properly prepared. Rushing past the preparation to get to the ceremony is like building a house without digging the footings: it may look finished from the outside, and then the first serious season will reveal what is underneath.

Have the hard conversations now. The money conversation — all of it, including the debts and the obligations and the different relationships with spending. The family conversation — what you each carry from your families of origin, what you want to keep, what you are determined to leave behind. The healing conversation — not "are we okay" but "what are we each still working through, and how will we support each other through it." The roles conversation — not as a power negotiation but as a genuine inquiry into how two people build a shared life in a way that honours both of them.

Do this work now. Do it thoroughly. Do it honestly. And then walk towards the altar knowing that what you are building has a foundation worthy of what you are committing to.`,
  },
  {
    title: 'A Final Word',
    content: `You chose each other. In the middle of difficulty, in the middle of hurt, in the middle of a conversation that could have ended everything — you chose each other again. That is not a small thing. That is the thing.

The love you are building is not the love you began with. The beginning was simpler — it had to be, because you did not yet know each other fully, and the fullness is what costs. What you are building now is something that has been tested. That knows what it is dealing with. That has seen the worst and decided the best is still worth pursuing.

That kind of love is not romantic in the cinema sense. It is romantic in the oldest sense — the sense of something that requires courage, that involves sacrifice, that is chosen in the full knowledge of what the choice costs. That is what you are doing. Every day you open this app, every task you tick, every hard conversation you have instead of avoiding — you are doing it.

Keep going. Not because it will always be easy — it will not. Not because you will not hurt each other again — you will. But because the person across from you is worth the work. And because the version of yourselves that exists on the other side of this work — the version that knows how to love well, that has built something real — is worth becoming.

The love you want is not somewhere else, with someone easier. It is here. Between these two specific, imperfect, trying people. Begin again today. That is all that is ever required.`,
  },
];

function AboutReader() {
  const [page, setPage] = useState(0);
  const total = ABOUT_PAGES.length;
  const current = ABOUT_PAGES[page];

  return (
    <div style={{ background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid #FDE8EC', boxShadow: '0 2px 12px rgba(92,26,46,0.07)' }}>
      {/* Page header */}
      <div style={{ background: 'linear-gradient(135deg, #3D0C18, #6B2D3E)', padding: '16px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            About This App
          </span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif' }}>
            {page + 1} / {total}
          </span>
        </div>
        <div style={{ fontSize: 16, fontWeight: 'bold', color: 'white', fontFamily: 'Georgia, serif' }}>
          {current.title}
        </div>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 4, marginTop: 10, flexWrap: 'wrap' }}>
          {ABOUT_PAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              style={{
                width: i === page ? 20 : 7,
                height: 7,
                borderRadius: 4,
                border: 'none',
                cursor: 'pointer',
                background: i === page ? '#F2A7B3' : 'rgba(255,255,255,0.25)',
                padding: 0,
                transition: 'all 0.25s',
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 18px', minHeight: 280 }}>
        {current.content.split('\n\n').map((para, i) => (
          <p key={i} style={{
            fontSize: 14,
            fontFamily: 'Georgia, serif',
            color: '#2C1A1A',
            lineHeight: 1.8,
            margin: i === 0 ? '0 0 14px' : '0 0 14px',
            fontStyle: i === 0 && page === ABOUT_PAGES.length - 1 ? 'normal' : 'normal',
          }}>
            {para}
          </p>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 0, borderTop: '1px solid #FDE8EC' }}>
        <button
          onClick={() => setPage(p => Math.max(0, p - 1))}
          disabled={page === 0}
          style={{
            flex: 1, padding: '13px', background: 'none', border: 'none', borderRight: '1px solid #FDE8EC',
            cursor: page === 0 ? 'default' : 'pointer', color: page === 0 ? '#D1B8BC' : '#C0556A',
            fontFamily: 'Georgia, serif', fontSize: 13, fontStyle: 'italic', transition: 'all 0.2s',
          }}
        >
          ← Previous
        </button>
        <button
          onClick={() => setPage(p => Math.min(total - 1, p + 1))}
          disabled={page === total - 1}
          style={{
            flex: 1, padding: '13px', background: page === total - 1 ? 'none' : '#FFF5F7',
            border: 'none', cursor: page === total - 1 ? 'default' : 'pointer',
            color: page === total - 1 ? '#D1B8BC' : '#C0556A',
            fontFamily: 'Georgia, serif', fontSize: 13, fontStyle: 'italic', fontWeight: page === total - 1 ? 'normal' : 'bold', transition: 'all 0.2s',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default function SettingsView({ settings, onSettingsChange }) {
  const [confirmClear, setConfirmClear] = useState(false);
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    const next = { ...settings, [key]: value };
    lsSet('lb_settings', next);
    onSettingsChange(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const clearAll = () => {
    const keys = Object.keys(localStorage).filter(k => k.startsWith('lb_'));
    keys.forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  return (
    <>
      {/* Header */}
      <div style={{ background: 'linear-gradient(145deg, #374151, #4B5563)', borderRadius: 14, padding: '18px 18px', marginBottom: 16, color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <SlidersIcon size={20} color="rgba(255,255,255,0.8)" />
          <div>
            <div style={{ fontSize: 11, opacity: 0.65, textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'sans-serif' }}>App Settings</div>
            <div style={{ fontSize: 18, fontWeight: 'bold' }}>Personalise</div>
          </div>
        </div>
        {saved && (
          <div style={{ marginTop: 10, fontSize: 12, background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 14px', display: 'inline-block', fontFamily: 'sans-serif' }}>
            Saved
          </div>
        )}
      </div>

      {/* Names */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 10px rgba(92,26,46,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <UserIcon size={16} color="#C0556A" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', fontFamily: 'Georgia, serif' }}>Your Names</span>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: '#C0556A', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>His name</label>
            <input
              value={settings.himName}
              onChange={e => update('himName', e.target.value)}
              placeholder="His name"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #F2A7B3', borderRadius: 10, fontFamily: 'Georgia, serif', fontSize: 14, color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 11, color: '#5A7A6E', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>Her name</label>
            <input
              value={settings.herName}
              onChange={e => update('herName', e.target.value)}
              placeholder="Her name"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #A8D5C5', borderRadius: 10, fontFamily: 'Georgia, serif', fontSize: 14, color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC', boxShadow: '0 2px 10px rgba(92,26,46,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <HeartIcon size={16} color="#C0556A" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#5C1A2E', fontFamily: 'Georgia, serif' }}>Preferences</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
          <div style={{ flex: 1, paddingRight: 12 }}>
            <div style={{ fontSize: 13, color: '#2C1A1A', fontFamily: 'Georgia, serif' }}>Show scriptures in Words section</div>
            <div style={{ fontSize: 11, color: '#7A6060', fontFamily: 'sans-serif', marginTop: 2 }}>Include Bible verses alongside advice and quotes</div>
          </div>
          <button
            onClick={() => update('showScriptures', !settings.showScriptures)}
            style={{ width: 46, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer', flexShrink: 0, background: settings.showScriptures ? '#C0556A' : '#D1D5DB', position: 'relative', transition: 'background 0.2s' }}
          >
            <span style={{ position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white', transition: 'left 0.2s', left: settings.showScriptures ? 23 : 3 }} />
          </button>
        </div>
      </div>

      {/* About — paginated */}
      <div style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, paddingLeft: 2 }}>
          <InfoIcon size={15} color="#5A7A6E" />
          <span style={{ fontSize: 12, color: '#5A7A6E', fontFamily: 'sans-serif', textTransform: 'uppercase', letterSpacing: '0.08em' }}>About — 10 pages of guidance</span>
        </div>
        <AboutReader />
      </div>

      {/* Data */}
      <div style={{ background: 'white', borderRadius: 14, padding: '16px', marginBottom: 14, border: '1px solid #FDE8EC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <AlertCircleIcon size={16} color="#C05454" />
          <span style={{ fontSize: 13, fontWeight: 'bold', color: '#C05454', fontFamily: 'Georgia, serif' }}>Data</span>
        </div>
        {!confirmClear ? (
          <button onClick={() => setConfirmClear(true)} style={{ width: '100%', padding: '11px', background: 'none', border: '1px solid #FCA5A5', borderRadius: 10, color: '#C05454', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
            Clear all progress and start fresh
          </button>
        ) : (
          <div style={{ background: '#FFF5F5', borderRadius: 10, padding: '14px' }}>
            <p style={{ fontSize: 13, color: '#C05454', fontFamily: 'Georgia, serif', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>
              This will erase all checked tasks, streaks, journal entries, and saved wisdom. Cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={clearAll} style={{ flex: 1, padding: '10px', background: '#C05454', border: 'none', borderRadius: 10, color: 'white', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
                Yes, clear everything
              </button>
              <button onClick={() => setConfirmClear(false)} style={{ flex: 1, padding: '10px', background: 'none', border: '1px solid #E5E7EB', borderRadius: 10, color: '#374151', fontSize: 13, cursor: 'pointer', fontFamily: 'Georgia, serif' }}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      <div style={{ height: 16 }} />
    </>
  );
}

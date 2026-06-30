export const DAILY_HIM = [
  { id: "dh1", text: "Give her one specific, genuine compliment — not generic, name something you actually noticed" },
  { id: "dh2", text: "Make real eye contact when she walks in. Greet her fully before anything else" },
  { id: "dh3", text: "Ask how she's really doing and listen — no fixing, no advice unless she asks" },
  { id: "dh4", text: "Initiate non-sexual physical touch — a hug, hand on her shoulder, sitting close" },
  { id: "dh5", text: "Send one message during the day with no purpose except: I thought of you" },
  { id: "dh6", text: "Notice her mood without waiting for her to announce it. Name what you see" },
];

export const DAILY_HER = [
  { id: "dr1", text: "Receive something he does today without minimising it or comparing it to what's missing" },
  { id: "dr2", text: "If something hurts today, name it — don't file it away for later" },
  { id: "dr3", text: "Speak to him in a tone you would want him to use with you" },
  { id: "dr4", text: "Acknowledge one thing he did well today — out loud, directly" },
  { id: "dr5", text: "Stay open today. Don't decide in advance how the day will go" },
];

export const DAILY_BOTH = [
  { id: "db1", text: "Morning: a real greeting — eye contact, warmth, presence before the day begins" },
  { id: "db2", text: "Evening: 15 minutes of conversation about your inner world — not tasks, not logistics" },
  { id: "db3", text: "Pray together, even briefly. Even just holding hands in silence" },
  { id: "db4", text: "Before bed: say one true thing you're grateful for about each other" },
];

export const WEEKLY_HIM = [
  { id: "wh1", text: "Initiate the weekly check-in. Don't wait for her to ask — you lead it" },
  { id: "wh2", text: "Bring up one thing that has been bothering you before it becomes resentment" },
  { id: "wh3", text: "Review every promise you made this week. Were they all kept? Be honest" },
  { id: "wh4", text: "Write her something — a note, a voice message, a text — that names what you value about her" },
  { id: "wh5", text: "Do one act of service without being asked and without mentioning it" },
];

export const WEEKLY_HER = [
  { id: "wr1", text: "In the check-in, share one specific thing that made you feel loved this week" },
  { id: "wr2", text: "Share one specific thing you would have liked more of — clearly, without accusation" },
  { id: "wr3", text: "Write in your journal: what pattern did I notice in myself this week?" },
  { id: "wr4", text: "Give him one genuine, unprompted appreciation before the week ends" },
  { id: "wr5", text: "Identify one moment you reacted from the past wound rather than the present. Name it for yourself" },
];

export const WEEKLY_BOTH = [
  { id: "wb1", text: "'State of Us' conversation — What felt good this week? What needs attention?" },
  { id: "wb2", text: "One intentional shared activity — undistracted, phones away, genuinely together" },
  { id: "wb3", text: "Repair anything left unresolved. Don't carry it into the next week" },
  { id: "wb4", text: "Write down your shared commitments for next week. Both of you agree, both sign off" },
  { id: "wb5", text: "Name one thing each of you is proud of from this week — in the relationship" },
];

export const MONTHLY_REVIEW = [
  { id: "mr1", category: "What Went Well", text: "What is one thing my partner did this month that made me feel truly loved?" },
  { id: "mr2", category: "What Went Well", text: "What is one moment I am proud of in how I showed up this month?" },
  { id: "mr3", category: "What Went Well", text: "What area of growth have I genuinely noticed — in myself? In my partner?" },
  { id: "mr4", category: "What Needs Attention", text: "What pattern kept repeating this month that we have not yet resolved?" },
  { id: "mr5", category: "What Needs Attention", text: "Is there a promise I made that I have not kept? What specifically is my plan?" },
  { id: "mr6", category: "What Needs Attention", text: "Was there hurt I stored rather than saying? Name it now, in this space" },
  { id: "mr7", category: "What Needs Attention", text: "Was there a moment I responded from old pain rather than the present situation?" },
  { id: "mr8", category: "Looking Ahead", text: "What is one specific thing I commit to doing differently in the month ahead?" },
  { id: "mr9", category: "Looking Ahead", text: "What do I need from my partner in the next 30 days — be specific" },
  { id: "mr10", category: "Looking Ahead", text: "What is one shared goal or experience we want to pursue together?" },
  { id: "mr11", category: "Closing", text: "End by sharing one genuine, heartfelt appreciation for each other out loud" },
];

export const ALL_DAILY = [...DAILY_HIM, ...DAILY_HER, ...DAILY_BOTH];
export const ALL_WEEKLY = [...WEEKLY_HIM, ...WEEKLY_HER, ...WEEKLY_BOTH];
export const ALL_MONTHLY = MONTHLY_REVIEW;

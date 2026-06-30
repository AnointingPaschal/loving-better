// ── Categories ─────────────────────────────────────────────────────────────────
export const CATEGORIES = [
  { id: 'all',           label: 'All',          icon: '✨' },
  { id: 'love',          label: 'Love',         icon: '❤️' },
  { id: 'communication', label: 'Talk',         icon: '💬' },
  { id: 'trust',         label: 'Trust',        icon: '🤝' },
  { id: 'healing',       label: 'Healing',      icon: '🌱' },
  { id: 'faith',         label: 'Faith',        icon: '🙏' },
  { id: 'him',           label: 'For Him',      icon: '👨🏾' },
  { id: 'her',           label: 'For Her',      icon: '👩🏾' },
  { id: 'daily',         label: 'Sparks',       icon: '⚡' },
];

// ── All wisdom entries ─────────────────────────────────────────────────────────
// type: 'quote' | 'advice' | 'scripture' | 'spark' | 'affirmation'
export const WISDOM = [

  // ── LOVE ─────────────────────────────────────────────────────────────────────
  {
    id: 'l1', category: 'love', type: 'quote',
    text: 'Love is not a feeling you fall into. It is a choice you make, rebuild, and renew every single day.',
    author: 'Loving Better',
  },
  {
    id: 'l2', category: 'love', type: 'advice',
    text: 'The love that survives is not the love that never hurts. It is the love that keeps choosing, even after the hurt. You are not failing by feeling pain. You are being asked to choose again.',
    author: 'Loving Better',
  },
  {
    id: 'l3', category: 'love', type: 'quote',
    text: 'Real love does not erase your past. It holds it with you — and builds something new anyway.',
    author: 'Loving Better',
  },
  {
    id: 'l4', category: 'love', type: 'advice',
    text: 'There is a version of love that is only about feeling good. And there is a version that is about commitment — to growth, to honesty, to staying in the room. Only one of those builds a life.',
    author: 'Loving Better',
  },
  {
    id: 'l5', category: 'love', type: 'quote',
    text: 'Small things done consistently are the material of great love. Grand gestures are the moments you remember. Daily faithfulness is the thing you live inside.',
    author: 'Loving Better',
  },
  {
    id: 'l6', category: 'love', type: 'advice',
    text: 'Think of the relationship like a bank account. Every act of connection, every apology, every moment of presence — these are deposits. Every dismissal, every broken promise, every avoided conversation — withdrawals. What is your balance today?',
    author: 'Loving Better',
  },
  {
    id: 'l7', category: 'love', type: 'quote',
    text: 'To love someone fully is to know them fully — not the curated version, but the 3am version. The scared version. The version that has failed. That is the person who needs to be loved.',
    author: 'Loving Better',
  },
  {
    id: 'l8', category: 'love', type: 'advice',
    text: 'Most couples do not fall out of love. They fall out of attention. Love stays. Attentiveness has to be maintained. Pay attention to the person you chose.',
    author: 'Loving Better',
  },
  {
    id: 'l9', category: 'love', type: 'quote',
    text: 'Being in the same room is not the same as being present. Presence is an orientation of your whole attention toward the other person. You can be right next to someone and still leave them alone.',
    author: 'Loving Better',
  },
  {
    id: 'l10', category: 'love', type: 'spark',
    text: 'Love is a verb. Today, make it active.',
  },
  {
    id: 'l11', category: 'love', type: 'quote',
    text: 'A relationship is not a 50/50 deal. Some days you will carry 80% and they will carry 20. Some days it reverses. The goal is not fairness in every moment. It is faithfulness across the long arc.',
    author: 'Loving Better',
  },
  {
    id: 'l12', category: 'love', type: 'advice',
    text: 'Before you decide that love is not enough, ask yourself: have I been expressing my love in the form my partner can actually receive? Love that does not land is not the same as love that does not exist.',
    author: 'Loving Better',
  },

  // ── COMMUNICATION ─────────────────────────────────────────────────────────────
  {
    id: 'c1', category: 'communication', type: 'quote',
    text: 'Avoidance is not kindness. It is a slow way of letting the relationship starve.',
    author: 'Loving Better',
  },
  {
    id: 'c2', category: 'communication', type: 'advice',
    text: 'The conversations you have been putting off are not going anywhere. They are sitting between you, quietly, growing heavier every day. The cost of having them is discomfort. The cost of not having them is everything.',
    author: 'Loving Better',
  },
  {
    id: 'c3', category: 'communication', type: 'quote',
    text: 'Most fights are not really about the thing they appear to be about. They are about the thing underneath it — the unmet need, the old wound, the fear that was never spoken. Learn to name the underneath.',
    author: 'Loving Better',
  },
  {
    id: 'c4', category: 'communication', type: 'advice',
    text: 'There is a difference between speaking and being heard. Before you respond in a hard conversation, reflect back what your partner said. "What I heard you say is…" That single practice changes everything.',
    author: 'Loving Better',
  },
  {
    id: 'c5', category: 'communication', type: 'quote',
    text: 'The softest words reach the furthest. It is not the loudness of what you say that makes it land. It is the safety the other person feels when you say it.',
    author: 'Loving Better',
  },
  {
    id: 'c6', category: 'communication', type: 'advice',
    text: 'When you feel the need to say twelve things at once, choose one. The most important one. Say it clearly. Give it room to land. Then wait. One thing, truly heard, moves a relationship forward more than twelve things dumped at once.',
    author: 'Loving Better',
  },
  {
    id: 'c7', category: 'communication', type: 'spark',
    text: 'Ask one real question today. Not about logistics. About their inner world.',
  },
  {
    id: 'c8', category: 'communication', type: 'advice',
    text: 'Silence is not neutral. Every time you choose not to say the thing, it goes underground — not away. Underground feelings do not dissolve. They decay, and what they become is resentment. Say the thing while it is still small.',
    author: 'Loving Better',
  },
  {
    id: 'c9', category: 'communication', type: 'quote',
    text: 'A person who never brings hard things up is not keeping the peace. They are mortgaging it — borrowing from the future to pay for comfort now.',
    author: 'Loving Better',
  },
  {
    id: 'c10', category: 'communication', type: 'advice',
    text: 'Name the pause. If a conversation is getting too heated to be productive, say: "I need 20 minutes and then I am coming back." Not silence. Not a door slam. A named pause with a commitment to return. Then return.',
    author: 'Loving Better',
  },
  {
    id: 'c11', category: 'communication', type: 'quote',
    text: 'The truth does not lose its truth if it is spoken gently. But a truth spoken harshly is often the only thing the other person can hear — and they cannot hear the truth inside it.',
    author: 'Loving Better',
  },
  {
    id: 'c12', category: 'communication', type: 'spark',
    text: '"How are you really doing?" — say those five words today and mean them.',
  },
  {
    id: 'c13', category: 'communication', type: 'advice',
    text: 'Before bringing up something difficult, check: am I speaking from the wound or from the war? The wound says — "this hurt me and I need you to understand." The war says — "here is all the evidence against you." One invites connection. The other invites defense.',
    author: 'Loving Better',
  },

  // ── TRUST ─────────────────────────────────────────────────────────────────────
  {
    id: 't1', category: 'trust', type: 'quote',
    text: 'Trust is not rebuilt in a conversation. It is rebuilt in the accumulation of small, consistent, kept commitments — over time, without fanfare, without scorekeeping.',
    author: 'Loving Better',
  },
  {
    id: 't2', category: 'trust', type: 'advice',
    text: 'The gap between what you promised and what you did — that gap is where trust lives or dies. Close the gap. Not by making fewer promises. By keeping more of the ones you make. And by only promising what you can actually deliver.',
    author: 'Loving Better',
  },
  {
    id: 't3', category: 'trust', type: 'quote',
    text: 'Trustworthiness is not a personality trait. It is a practice. You are not born reliable. You become reliable — by doing the thing you said you would do, one more time, one more day.',
    author: 'Loving Better',
  },
  {
    id: 't4', category: 'trust', type: 'advice',
    text: 'When you slip — and you will — do not wait to be confronted. Go to your partner first. Name specifically what you said you would do and did not. Offer a real plan, not another promise. That kind of accountability rebuilds faster than anything else.',
    author: 'Loving Better',
  },
  {
    id: 't5', category: 'trust', type: 'quote',
    text: 'Insecurity in a relationship is often not a personal flaw. It is a reasonable response to inconsistency. The path to security is not more reassurance. It is more reliable behavior, consistently demonstrated.',
    author: 'Loving Better',
  },
  {
    id: 't6', category: 'trust', type: 'spark',
    text: 'One promise, kept completely, today. Just one.',
  },
  {
    id: 't7', category: 'trust', type: 'advice',
    text: 'Transparency is not about having no privacy. It is about not hiding the things your partner has a right to know. Ask yourself honestly: is there anything I am concealing that is costing us closeness? Start there.',
    author: 'Loving Better',
  },
  {
    id: 't8', category: 'trust', type: 'quote',
    text: 'A secure relationship is not one that has never been tested. It is one that has been tested and survived — and the survival itself becomes the foundation of a deeper security.',
    author: 'Loving Better',
  },

  // ── HEALING ──────────────────────────────────────────────────────────────────
  {
    id: 'h1', category: 'healing', type: 'advice',
    text: 'Your parents\' marriage is not your destiny. It is a warning. You can see the pattern, name it, grieve it, and choose differently. That choosing is not easy. But it is entirely available to you.',
    author: 'Loving Better',
  },
  {
    id: 'h2', category: 'healing', type: 'quote',
    text: 'Forgiveness is not saying what happened was fine. It is deciding that the hurt will not have the final word. You release the other person from the debt — not because they earned it, but because you are choosing your future over your injury.',
    author: 'Loving Better',
  },
  {
    id: 'h3', category: 'healing', type: 'advice',
    text: 'Unhealed wounds wound others. The pain you carry from before this relationship shows up in it. The most loving thing you can do for your partner is to actively pursue your own healing. Not as a prerequisite for being loved — as an act of love itself.',
    author: 'Loving Better',
  },
  {
    id: 'h4', category: 'healing', type: 'quote',
    text: 'You cannot carry the past and build the future at the same time. Not forever. At some point, you have to decide which one matters more.',
    author: 'Loving Better',
  },
  {
    id: 'h5', category: 'healing', type: 'advice',
    text: 'Resentment is what happens when pain is not processed. It is not your fault that it built up. But it is your responsibility to address it — not by dumping it all at once, but by naming things as they happen, while they are still small enough to carry.',
    author: 'Loving Better',
  },
  {
    id: 'h6', category: 'healing', type: 'spark',
    text: 'One thing you have been holding: name it today. Even just to yourself.',
  },
  {
    id: 'h7', category: 'healing', type: 'quote',
    text: 'Healing in a relationship is not linear. You will have weeks that feel like progress and weeks that feel like regression. Both are part of the same path. Keep walking.',
    author: 'Loving Better',
  },
  {
    id: 'h8', category: 'healing', type: 'advice',
    text: 'There is a difference between carrying your history and being imprisoned by it. Your past is real. It shaped you. It does not have to sentence you. The same experiences that taught you to close off can, with intention, teach you to open carefully and selectively to someone who has earned it.',
    author: 'Loving Better',
  },
  {
    id: 'h9', category: 'healing', type: 'quote',
    text: 'Repair after a rupture matters more than the rupture itself. Every couple has moments that go wrong. The ones who make it are the ones who come back, name what happened, and rebuild the bridge.',
    author: 'Loving Better',
  },
  {
    id: 'h10', category: 'healing', type: 'advice',
    text: 'Contempt — the rolled eye, the dismissive laugh, the look that says "I have lost respect for you" — is the single most destructive thing in a relationship. More than conflict. More than silence. When you feel contempt rising, stop. Go back to the wound beneath it. Speak from there instead.',
    author: 'Loving Better',
  },

  // ── FAITH ────────────────────────────────────────────────────────────────────
  {
    id: 'f1', category: 'faith', type: 'scripture',
    text: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonour others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.',
    author: '1 Corinthians 13:4–5',
  },
  {
    id: 'f2', category: 'faith', type: 'advice',
    text: 'Prayer is not a substitute for the hard work of communication and change. It is the context in which that work becomes possible. When you pray together, you are acknowledging that you need more than you have — and inviting the Source of what you need into the space between you.',
    author: 'Loving Better',
  },
  {
    id: 'f3', category: 'faith', type: 'scripture',
    text: 'Two are better than one, because they have a good return for their labour. If either of them falls down, one can help the other up.',
    author: 'Ecclesiastes 4:9–10',
  },
  {
    id: 'f4', category: 'faith', type: 'advice',
    text: 'The love described in scripture is not offered as a description of what humans naturally do. It is a vision of what you are invited to become — by grace, in relationship with God and with each other. You are not expected to do it perfectly. You are invited to keep trying.',
    author: 'Loving Better',
  },
  {
    id: 'f5', category: 'faith', type: 'scripture',
    text: 'Be completely humble and gentle; be patient, bearing with one another in love. Make every effort to keep the unity of the Spirit through the bond of peace.',
    author: 'Ephesians 4:2–3',
  },
  {
    id: 'f6', category: 'faith', type: 'quote',
    text: 'To pray with someone is to let them hear you speak honestly to God. It is one of the most intimate forms of communication available to you — and it costs nothing except the courage to be seen.',
    author: 'Loving Better',
  },
  {
    id: 'f7', category: 'faith', type: 'scripture',
    text: 'In the multitude of counsellors there is safety.',
    author: 'Proverbs 11:14',
  },
  {
    id: 'f8', category: 'faith', type: 'advice',
    text: 'God is not surprised by the state of your relationship. He is not waiting for you to fix it before He meets you in it. Bring Him into the mess — into the actual conversations, the actual fears, the actual places where you fall short. That is where His help lives.',
    author: 'Loving Better',
  },
  {
    id: 'f9', category: 'faith', type: 'scripture',
    text: 'Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you. And over all these virtues put on love, which binds them all together in perfect unity.',
    author: 'Colossians 3:13–14',
  },
  {
    id: 'f10', category: 'faith', type: 'quote',
    text: 'Faith in a relationship means believing in the person your partner is becoming, not just reacting to the person they are today. See them with the eyes of what God is doing in them, not only what they have done to you.',
    author: 'Loving Better',
  },
  {
    id: 'f11', category: 'faith', type: 'scripture',
    text: 'Husbands, love your wives, just as Christ loved the church and gave himself up for her.',
    author: 'Ephesians 5:25',
  },
  {
    id: 'f12', category: 'faith', type: 'spark',
    text: 'Pray together tonight. Even one sentence each. It changes something.',
  },

  // ── FOR HIM ──────────────────────────────────────────────────────────────────
  {
    id: 'him1', category: 'him', type: 'affirmation',
    text: 'You have more to offer than what you provide. She knows this. She is waiting for you to offer the rest — the presence, the words, the willingness to be known fully.',
    author: 'Loving Better',
  },
  {
    id: 'him2', category: 'him', type: 'advice',
    text: 'Staying quiet to keep the peace is not peace. It is a debt deferred. Every time you absorb something rather than raise it, you add to a private account that will eventually demand payment — with interest.',
    author: 'Loving Better',
  },
  {
    id: 'him3', category: 'him', type: 'affirmation',
    text: 'You are not required to have the perfect words. You are required to try. She does not need eloquence. She needs to know that you are making the effort — that she is worth the discomfort of a difficult conversation.',
    author: 'Loving Better',
  },
  {
    id: 'him4', category: 'him', type: 'advice',
    text: 'The fear of difficult conversations is real. But the fear costs more than the conversation. Every avoided talk teaches her that she is not safe enough here for honesty. Every courageous one teaches her the opposite.',
    author: 'Loving Better',
  },
  {
    id: 'him5', category: 'him', type: 'spark',
    text: 'Tell her one specific thing you love about her today. Not general. Specific. Something you actually noticed.',
  },
  {
    id: 'him6', category: 'him', type: 'advice',
    text: 'Physical intimacy and emotional intimacy are connected but not the same. When you seek closeness without consistently offering emotional presence, she experiences the imbalance — even if she cannot always name it. Lead with emotional presence first.',
    author: 'Loving Better',
  },
  {
    id: 'him7', category: 'him', type: 'affirmation',
    text: 'You are not the worst version of yourself that has appeared in this relationship. You are the version that is reading this, that is trying, that has not left. That version can also be the one that changes.',
    author: 'Loving Better',
  },
  {
    id: 'him8', category: 'him', type: 'advice',
    text: 'When she goes quiet and something seems heavy in her, that is not the moment to look away. That is the moment to come toward her. To say: "I can see something is weighing on you. I am here." You do not need to fix it. Just be present to it.',
    author: 'Loving Better',
  },
  {
    id: 'him9', category: 'him', type: 'spark',
    text: 'Initiate something today. A check-in, a hug, a conversation. Do not wait for her to come to you.',
  },
  {
    id: 'him10', category: 'him', type: 'advice',
    text: 'A man who learns to express what he feels, who learns to stay in the hard conversation rather than retreat from it, who leads with presence before anything else — that man will be more fully himself. More alive. More capable of the depth of connection you both want.',
    author: 'Loving Better',
  },
  {
    id: 'him11', category: 'him', type: 'affirmation',
    text: 'Provision is good and it is valued. But she does not need you to earn more. She needs you to show up more fully to the life you already share. Those are different things.',
    author: 'Loving Better',
  },
  {
    id: 'him12', category: 'him', type: 'advice',
    text: 'When you make a commitment, write it down immediately and specifically. Not "I will be better" — but "I will check in with her every Sunday evening and ask how she is really doing." Vague commitments dissolve. Specific ones can be kept.',
    author: 'Loving Better',
  },

  // ── FOR HER ──────────────────────────────────────────────────────────────────
  {
    id: 'her1', category: 'her', type: 'affirmation',
    text: 'His limitations as a communicator are not evidence of your worth. They are evidence of his development as a partner. The gap is in him. You are not the proof of the gap.',
    author: 'Loving Better',
  },
  {
    id: 'her2', category: 'her', type: 'advice',
    text: 'Your history with your family taught you real things. But it is worth asking: am I responding to what is actually happening right now, or am I responding to what I was trained to fear? Both can be present at once. They deserve separate responses.',
    author: 'Loving Better',
  },
  {
    id: 'her3', category: 'her', type: 'affirmation',
    text: 'You are not too much. You are not too direct, or too feeling, or too demanding for wanting to be genuinely loved. What you are asking for is ordinary and necessary and right. Do not let the disappointment of not receiving it make you believe you should not be asking.',
    author: 'Loving Better',
  },
  {
    id: 'her4', category: 'her', type: 'advice',
    text: 'Remaining open to the possibility that he can change is a risk. There is no way around that. But closing to it guarantees a future that staying open might prevent. Discernment and openness are not opposites — you can have both.',
    author: 'Loving Better',
  },
  {
    id: 'her5', category: 'her', type: 'spark',
    text: 'What would it feel like today to receive something he does without pre-rejecting it? Try that.',
  },
  {
    id: 'her6', category: 'her', type: 'advice',
    text: 'There is a version of independence that protects you from pain by making sure you never fully need anyone. That version keeps you safe. It also keeps you alone in your own relationship. The risk of letting him in is real. So is the cost of never letting him in.',
    author: 'Loving Better',
  },
  {
    id: 'her7', category: 'her', type: 'affirmation',
    text: 'You are a woman of rare value. You are perceptive, honest, capable of extraordinary loyalty, and possessed of a capacity for love that insists on being real rather than comfortable. Do not let anyone — including the most painful chapters — make you doubt that.',
    author: 'Loving Better',
  },
  {
    id: 'her8', category: 'her', type: 'advice',
    text: 'There is a difference between the articulation that comes from the wound and the articulation that comes from the war. The wound invites the other person in. The war closes them down. Before a hard conversation, ask yourself: which one am I speaking from right now?',
    author: 'Loving Better',
  },
  {
    id: 'her9', category: 'her', type: 'spark',
    text: 'Name one thing you appreciate about him today — to him, out loud, directly.',
  },
  {
    id: 'her10', category: 'her', type: 'advice',
    text: 'Your parents\' marriage is a warning, not a verdict. You are writing a different story. But the author of that story must be you — actively, deliberately, through specific daily choices about who you will be in this relationship.',
    author: 'Loving Better',
  },
  {
    id: 'her11', category: 'her', type: 'affirmation',
    text: 'The softness you have been guarding so carefully — it is still there. It is waiting for a safe place to show itself. You are allowed to create that place, with someone who has shown they are trying to be worthy of it.',
    author: 'Loving Better',
  },
  {
    id: 'her12', category: 'her', type: 'advice',
    text: 'Healing your own wounds is not a prerequisite for being loved. But it will make loving — and being loved — significantly easier. Do it for yourself first. The relationship will feel the benefit.',
    author: 'Loving Better',
  },

  // ── DAILY SPARKS ─────────────────────────────────────────────────────────────
  {
    id: 'd1', category: 'daily', type: 'spark',
    text: 'What is one thing you have been meaning to say? Say it today.',
  },
  {
    id: 'd2', category: 'daily', type: 'spark',
    text: 'Look at them today like it is the first time you have really seen them in a while. Because it might be.',
  },
  {
    id: 'd3', category: 'daily', type: 'spark',
    text: 'Make the repair. Whatever was left rough from the last few days — smooth it today.',
  },
  {
    id: 'd4', category: 'daily', type: 'spark',
    text: 'What is one specific thing they did recently that you have not thanked them for? Do that now.',
  },
  {
    id: 'd5', category: 'daily', type: 'spark',
    text: 'Touch them today — not from desire. From warmth. Just to say: I want to be near you.',
  },
  {
    id: 'd6', category: 'daily', type: 'spark',
    text: 'Put the phone down for one hour tonight and be fully with them.',
  },
  {
    id: 'd7', category: 'daily', type: 'spark',
    text: 'Say: "I was thinking about you." Mean it.',
  },
  {
    id: 'd8', category: 'daily', type: 'spark',
    text: 'What is one thing you could do today that would make them feel less alone in this?',
  },
  {
    id: 'd9', category: 'daily', type: 'spark',
    text: 'Remember why you chose them. Not who they were at their worst. Who they are at their best.',
  },
  {
    id: 'd10', category: 'daily', type: 'spark',
    text: 'Before the day ends: say something kind. Something true. Something you mean.',
  },
  {
    id: 'd11', category: 'daily', type: 'spark',
    text: 'Every day you choose them again is a vote for the future you both want.',
  },
  {
    id: 'd12', category: 'daily', type: 'spark',
    text: 'Ask about one thing they care about that has nothing to do with you or the relationship.',
  },
  {
    id: 'd13', category: 'daily', type: 'spark',
    text: 'The morning sets the tone. Make the first moment between you a warm one today.',
  },
  {
    id: 'd14', category: 'daily', type: 'spark',
    text: 'Laugh together today. Find something — anything. Laughter is oxygen for a relationship.',
  },
  {
    id: 'd15', category: 'daily', type: 'spark',
    text: 'One genuine, specific compliment. Not "you look nice." Something you actually noticed.',
  },
  {
    id: 'd16', category: 'daily', type: 'spark',
    text: 'Pray for them today. Not about the relationship problems. Just for them — their peace, their success, their joy.',
  },
  {
    id: 'd17', category: 'daily', type: 'spark',
    text: 'What would your relationship look like if you both acted today like you intend to act at your best? Do that.',
  },
  {
    id: 'd18', category: 'daily', type: 'spark',
    text: 'Say "I love you" in a way you have not said it recently. Slowly. Looking at them.',
  },
  {
    id: 'd19', category: 'daily', type: 'spark',
    text: 'Catch yourself before you respond in a way you will regret. Take the breath. Choose differently.',
  },
  {
    id: 'd20', category: 'daily', type: 'spark',
    text: 'Check in with yourself: what am I bringing to this relationship today? Am I full enough to give?',
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getWisdomByCategory(cat) {
  if (cat === 'all') return WISDOM;
  return WISDOM.filter(w => w.category === cat);
}

export function getDailyWisdom() {
  const day = Math.floor(Date.now() / 86400000);
  return WISDOM[day % WISDOM.length];
}

export function getRandomWisdom(excluding = []) {
  const pool = WISDOM.filter(w => !excluding.includes(w.id));
  if (!pool.length) return WISDOM[Math.floor(Math.random() * WISDOM.length)];
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getPageWisdom(seed) {
  // Deterministic per-page-load random: different every session but stable during it
  return WISDOM[seed % WISDOM.length];
}

export function getTypeColor(type) {
  return {
    quote:       { bg: '#FDE8EC', border: '#C0556A', label: 'Quote',       labelColor: '#C0556A' },
    advice:      { bg: '#FFF8F0', border: '#B8860B', label: 'Advice',      labelColor: '#B8860B' },
    scripture:   { bg: '#EEF5F0', border: '#5A7A6E', label: 'Scripture',   labelColor: '#5A7A6E' },
    spark:       { bg: '#F0F0FF', border: '#6B5BD2', label: 'Daily Spark', labelColor: '#6B5BD2' },
    affirmation: { bg: '#FFF0F5', border: '#D4758A', label: 'Affirmation', labelColor: '#D4758A' },
  }[type] || { bg: '#F5F5F5', border: '#999', label: type, labelColor: '#666' };
}

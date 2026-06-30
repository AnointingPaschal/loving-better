export function getDailyKey() {
  const d = new Date();
  return `lb_daily_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function getWeeklyKey() {
  const d = new Date();
  // ISO week: Monday-based
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const week = Math.ceil(((d - jan4) / 86400000 + jan4.getDay() + 1) / 7);
  return `lb_weekly_${d.getFullYear()}-W${String(week).padStart(2,'0')}`;
}

export function getMonthlyKey() {
  const d = new Date();
  return `lb_monthly_${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
}

export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

export function getYesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

// ── LocalStorage helpers ──────────────────────────────────────────────────────

export function lsGet(key, fallback = null) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch { return fallback; }
}

export function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ── Checked state ─────────────────────────────────────────────────────────────

export function loadChecked(tabKey) {
  return lsGet(tabKey, {});
}

export function saveChecked(tabKey, state) {
  lsSet(tabKey, state);
  // Record activity date
  const history = lsGet('lb_history', []);
  const today = getTodayStr();
  const existing = history.find(h => h.date === today);
  if (!existing) {
    history.push({ date: today, daily: false, weekly: false, monthly: false });
  }
  lsSet('lb_history', history.slice(-90)); // keep 90 days
}

// ── Streaks ───────────────────────────────────────────────────────────────────

export function loadStreaks() {
  return lsGet('lb_streaks', { daily: 0, weekly: 0, monthly: 0, lastDaily: null, lastWeekly: null });
}

export function updateStreakOnComplete(type, allComplete) {
  if (!allComplete) return;
  const streaks = loadStreaks();
  const today = getTodayStr();
  const yesterday = getYesterdayStr();

  if (type === 'daily') {
    if (streaks.lastDaily === today) return; // already counted today
    const isConsecutive = streaks.lastDaily === yesterday;
    streaks.daily = isConsecutive ? streaks.daily + 1 : 1;
    streaks.lastDaily = today;
  } else if (type === 'weekly') {
    const weekKey = getWeeklyKey();
    if (streaks.lastWeekly === weekKey) return;
    streaks.weekly = (streaks.weekly || 0) + 1;
    streaks.lastWeekly = weekKey;
  } else if (type === 'monthly') {
    const monthKey = getMonthlyKey();
    if (streaks.lastMonthly === monthKey) return;
    streaks.monthly = (streaks.monthly || 0) + 1;
    streaks.lastMonthly = monthKey;
  }

  lsSet('lb_streaks', streaks);
  return streaks;
}

// ── History helpers ───────────────────────────────────────────────────────────

export function markHistoryComplete(type) {
  const today = getTodayStr();
  const history = lsGet('lb_history', []);
  const idx = history.findIndex(h => h.date === today);
  if (idx >= 0) {
    history[idx][type] = true;
  } else {
    history.push({ date: today, daily: type === 'daily', weekly: type === 'weekly', monthly: type === 'monthly' });
  }
  lsSet('lb_history', history.slice(-90));
}

export function getLast7DaysHistory() {
  const history = lsGet('lb_history', []);
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const found = history.find(h => h.date === dateStr);
    days.push({
      date: dateStr,
      label: i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
      daily: found?.daily || false,
      weekly: found?.weekly || false,
    });
  }
  return days;
}

// ── Notes ─────────────────────────────────────────────────────────────────────

export function loadNotes() {
  return lsGet('lb_notes', {});
}

export function saveNote(key, text) {
  const notes = loadNotes();
  notes[key] = { text, updatedAt: new Date().toISOString() };
  lsSet('lb_notes', notes);
}

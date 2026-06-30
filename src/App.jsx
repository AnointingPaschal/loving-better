import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import MonthlyView from './components/MonthlyView';
import ProgressView from './components/ProgressView';
import Confetti from './components/Confetti';
import {
  getDailyKey, getWeeklyKey, getMonthlyKey,
  loadChecked, saveChecked, loadStreaks,
  updateStreakOnComplete, markHistoryComplete,
  loadNotes, saveNote,
} from './utils/storage';
import { ALL_DAILY, ALL_WEEKLY, ALL_MONTHLY } from './data/tasks';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('daily');
  const [daily, setDaily] = useState({});
  const [weekly, setWeekly] = useState({});
  const [monthly, setMonthly] = useState({});
  const [streaks, setStreaks] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [notes, setNotes] = useState({});
  const [confetti, setConfetti] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  // Load everything on mount
  useEffect(() => {
    setDaily(loadChecked(getDailyKey()));
    setWeekly(loadChecked(getWeeklyKey()));
    setMonthly(loadChecked(getMonthlyKey()));
    setStreaks(loadStreaks());
    setNotes(loadNotes());
  }, []);

  const flash = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1400);
  };

  // Toggle daily
  const toggleDaily = useCallback((id) => {
    setDaily(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(getDailyKey(), next);
      flash();
      const allDone = ALL_DAILY.every(i => next[i.id]);
      if (allDone) {
        const updated = updateStreakOnComplete('daily', true);
        if (updated) { setStreaks(updated); setConfetti(true); markHistoryComplete('daily'); }
      }
      return next;
    });
  }, []);

  // Toggle weekly
  const toggleWeekly = useCallback((id) => {
    setWeekly(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(getWeeklyKey(), next);
      flash();
      const allDone = ALL_WEEKLY.every(i => next[i.id]);
      if (allDone) {
        const updated = updateStreakOnComplete('weekly', true);
        if (updated) { setStreaks(updated); setConfetti(true); markHistoryComplete('weekly'); }
      }
      return next;
    });
  }, []);

  // Toggle monthly
  const toggleMonthly = useCallback((id) => {
    setMonthly(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(getMonthlyKey(), next);
      flash();
      const allDone = ALL_MONTHLY.every(i => next[i.id]);
      if (allDone) {
        const updated = updateStreakOnComplete('monthly', true);
        if (updated) { setStreaks(updated); setConfetti(true); markHistoryComplete('monthly'); }
      }
      return next;
    });
  }, []);

  const handleNote = useCallback((key, text) => {
    saveNote(key, text);
    setNotes(prev => ({ ...prev, [key]: { text, updatedAt: new Date().toISOString() } }));
  }, []);

  const dailyDone = ALL_DAILY.filter(i => daily[i.id]).length;
  const weeklyDone = ALL_WEEKLY.filter(i => weekly[i.id]).length;
  const monthlyDone = ALL_MONTHLY.filter(i => monthly[i.id]).length;

  return (
    <div className="app">
      {confetti && <Confetti onDone={() => setConfetti(false)} />}

      <Header
        streaks={streaks}
        savedFlash={savedFlash}
        dailyDone={dailyDone}
        dailyTotal={ALL_DAILY.length}
        weeklyDone={weeklyDone}
        weeklyTotal={ALL_WEEKLY.length}
        monthlyDone={monthlyDone}
        monthlyTotal={ALL_MONTHLY.length}
        activeTab={tab}
      />

      <TabNav active={tab} onChange={setTab}
        counts={{
          daily: { done: dailyDone, total: ALL_DAILY.length },
          weekly: { done: weeklyDone, total: ALL_WEEKLY.length },
          monthly: { done: monthlyDone, total: ALL_MONTHLY.length },
          progress: null,
        }}
      />

      <main className="main-content">
        {tab === 'daily' && (
          <DailyView checked={daily} onToggle={toggleDaily} notes={notes} onNote={handleNote} />
        )}
        {tab === 'weekly' && (
          <WeeklyView checked={weekly} onToggle={toggleWeekly} notes={notes} onNote={handleNote} />
        )}
        {tab === 'monthly' && (
          <MonthlyView checked={monthly} onToggle={toggleMonthly} notes={notes} onNote={handleNote} />
        )}
        {tab === 'progress' && (
          <ProgressView streaks={streaks} daily={daily} weekly={weekly} monthly={monthly} />
        )}
      </main>
    </div>
  );
}

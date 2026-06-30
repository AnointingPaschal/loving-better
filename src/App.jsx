import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import TabNav from './components/TabNav';
import BottomNav from './components/BottomNav';
import DailyView from './components/DailyView';
import WeeklyView from './components/WeeklyView';
import MonthlyView from './components/MonthlyView';
import ProgressView from './components/ProgressView';
import WisdomView from './components/WisdomView';
import TogetherView from './components/TogetherView';
import JournalView from './components/JournalView';
import SettingsView, { loadSettings } from './components/SettingsView';
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
  const [activeTab, setActiveTab] = useState('daily');   // top tabs
  const [activePage, setActivePage] = useState('home');  // bottom nav
  const [daily,   setDaily]   = useState({});
  const [weekly,  setWeekly]  = useState({});
  const [monthly, setMonthly] = useState({});
  const [streaks, setStreaks]  = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [notes,   setNotes]   = useState({});
  const [settings, setSettings] = useState(loadSettings());
  const [confetti, setConfetti] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setDaily(loadChecked(getDailyKey()));
    setWeekly(loadChecked(getWeeklyKey()));
    setMonthly(loadChecked(getMonthlyKey()));
    setStreaks(loadStreaks());
    setNotes(loadNotes());
  }, []);

  const flash = () => { setSavedFlash(true); setTimeout(() => setSavedFlash(false), 1400); };

  const toggleDaily = useCallback((id) => {
    setDaily(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(getDailyKey(), next);
      flash();
      if (ALL_DAILY.every(i => next[i.id])) {
        const updated = updateStreakOnComplete('daily', true);
        if (updated) { setStreaks(updated); setConfetti(true); markHistoryComplete('daily'); }
      }
      return next;
    });
  }, []);

  const toggleWeekly = useCallback((id) => {
    setWeekly(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(getWeeklyKey(), next);
      flash();
      if (ALL_WEEKLY.every(i => next[i.id])) {
        const updated = updateStreakOnComplete('weekly', true);
        if (updated) { setStreaks(updated); setConfetti(true); markHistoryComplete('weekly'); }
      }
      return next;
    });
  }, []);

  const toggleMonthly = useCallback((id) => {
    setMonthly(prev => {
      const next = { ...prev, [id]: !prev[id] };
      saveChecked(getMonthlyKey(), next);
      flash();
      if (ALL_MONTHLY.every(i => next[i.id])) {
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

  const handleBottomNav = (page) => {
    if (page === 'home') setActivePage('home');
    else setActivePage(page);
  };

  const dailyDone   = ALL_DAILY.filter(i => daily[i.id]).length;
  const weeklyDone  = ALL_WEEKLY.filter(i => weekly[i.id]).length;
  const monthlyDone = ALL_MONTHLY.filter(i => monthly[i.id]).length;

  const showTopTabs = activePage === 'home';

  return (
    <div className="app">
      {confetti && <Confetti onDone={() => setConfetti(false)} />}

      <Header
        streaks={streaks} savedFlash={savedFlash}
        dailyDone={dailyDone} dailyTotal={ALL_DAILY.length}
        weeklyDone={weeklyDone} weeklyTotal={ALL_WEEKLY.length}
        monthlyDone={monthlyDone} monthlyTotal={ALL_MONTHLY.length}
        activeTab={activeTab} activePage={activePage}
      />

      {showTopTabs && (
        <TabNav active={activeTab} onChange={setActiveTab}
          counts={{
            daily:    { done: dailyDone,   total: ALL_DAILY.length },
            weekly:   { done: weeklyDone,  total: ALL_WEEKLY.length },
            monthly:  { done: monthlyDone, total: ALL_MONTHLY.length },
            progress: null,
          }}
        />
      )}

      <main className="main-content">
        {activePage === 'home' && activeTab === 'daily'    && <DailyView   checked={daily}   onToggle={toggleDaily}   notes={notes} onNote={handleNote} settings={settings} />}
        {activePage === 'home' && activeTab === 'weekly'   && <WeeklyView  checked={weekly}  onToggle={toggleWeekly}  notes={notes} onNote={handleNote} settings={settings} />}
        {activePage === 'home' && activeTab === 'monthly'  && <MonthlyView checked={monthly} onToggle={toggleMonthly} notes={notes} onNote={handleNote} />}
        {activePage === 'home' && activeTab === 'progress' && <ProgressView streaks={streaks} daily={daily} weekly={weekly} monthly={monthly} />}
        {activePage === 'words'    && <WisdomView    settings={settings} />}
        {activePage === 'together' && <TogetherView  settings={settings} />}
        {activePage === 'journal'  && <JournalView   settings={settings} />}
        {activePage === 'settings' && <SettingsView  settings={settings} onSettingsChange={setSettings} />}
      </main>

      <BottomNav active={activePage} onChange={handleBottomNav} />
    </div>
  );
}

import { WEEKLY_HIM, WEEKLY_HER, WEEKLY_BOTH, ALL_WEEKLY } from '../data/tasks';
import { Section } from './CheckItem';
import StreakBar from './StreakBar';
import RandomWisdom from './RandomWisdom';
import { loadStreaks } from '../utils/storage';

const SECTIONS = [
  { id: 'him',  title: 'His weekly work',     emoji: '👨🏾', items: WEEKLY_HIM,  colorClass: 'rose', accentColor: '#C0556A', bgColor: '#FFF5F7', noteKey: 'weekly_him' },
  { id: 'her',  title: 'Her weekly work',     emoji: '👩🏾', items: WEEKLY_HER,  colorClass: 'sage', accentColor: '#5A7A6E', bgColor: '#F5FAF8', noteKey: 'weekly_her' },
  { id: 'both', title: 'Together this week',  emoji: '💛',   items: WEEKLY_BOTH, colorClass: 'gold', accentColor: '#B8860B', bgColor: '#FFFBF0', noteKey: 'weekly_both' },
];

export default function WeeklyView({ checked, onToggle, notes, onNote }) {
  const streaks = loadStreaks();
  const done = ALL_WEEKLY.filter(i => checked[i.id]).length;
  const allDone = done === ALL_WEEKLY.length;

  return (
    <>
      <StreakBar streaks={streaks} />

      {allDone && (
        <div className="complete-badge">🎉 Full week complete — this is what building looks like!</div>
      )}

      <RandomWisdom />

      <div className="info-banner">
        Once a week — protect this time. Treat it like an appointment you do not cancel. The 'State of Us' conversation is the most important thing on this list.
      </div>

      {SECTIONS.map(s => (
        <Section key={s.id} title={s.title} emoji={s.emoji} items={s.items} checked={checked} onToggle={onToggle}
          colorClass={s.colorClass} accentColor={s.accentColor} bgColor={s.bgColor}
          noteKey={s.noteKey} noteValue={notes[s.noteKey]} onNote={onNote} />
      ))}
    </>
  );
}

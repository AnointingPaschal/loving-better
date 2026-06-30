import { WEEKLY_HIM, WEEKLY_HER, WEEKLY_BOTH, ALL_WEEKLY } from '../data/tasks';
import { Section } from './CheckItem';
import StreakBar from './StreakBar';
import RandomWisdom from './RandomWisdom';
import { UserIcon, HeartIcon } from './Icons';
import { loadStreaks } from '../utils/storage';

export default function WeeklyView({ checked, onToggle, notes, onNote, settings }) {
  const streaks = loadStreaks();
  const allDone = ALL_WEEKLY.every(i => checked[i.id]);
  const him = settings?.himName || 'Him';
  const her = settings?.herName || 'Her';

  return (
    <>
      <StreakBar streaks={streaks} />
      {allDone && <div className="complete-badge">Full week complete — this is what building looks like</div>}
      <RandomWisdom />
      <div className="info-banner">
        Once a week — protect this time. The State of Us conversation is the most important thing on this list. He initiates.
      </div>
      <Section title={`${him}'s weekly work`} TitleIcon={p => <UserIcon {...p} color="#C0556A" />} items={WEEKLY_HIM} checked={checked} onToggle={onToggle} accentColor="#C0556A" bgColor="#FFF5F7" noteKey="weekly_him" noteValue={notes['weekly_him']} onNote={onNote} />
      <Section title={`${her}'s weekly work`} TitleIcon={p => <UserIcon {...p} color="#5A7A6E" />} items={WEEKLY_HER} checked={checked} onToggle={onToggle} accentColor="#5A7A6E" bgColor="#F5FAF8" noteKey="weekly_her" noteValue={notes['weekly_her']} onNote={onNote} />
      <Section title="Together this week" TitleIcon={p => <HeartIcon {...p} color="#B8860B" />} items={WEEKLY_BOTH} checked={checked} onToggle={onToggle} accentColor="#B8860B" bgColor="#FFFBF0" noteKey="weekly_both" noteValue={notes['weekly_both']} onNote={onNote} />
    </>
  );
}

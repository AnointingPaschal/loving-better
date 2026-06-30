import { DAILY_HIM, DAILY_HER, DAILY_BOTH, ALL_DAILY } from '../data/tasks';
import { Section } from './CheckItem';
import StreakBar from './StreakBar';
import RandomWisdom from './RandomWisdom';
import { UserIcon, UsersIcon, HeartIcon } from './Icons';
import { loadStreaks } from '../utils/storage';

const SECTIONS = [
  { id: 'him',  title: 'daily work',    TitleIcon: UserIcon,  items: DAILY_HIM,  accentColor: '#C0556A', bgColor: '#FFF5F7', noteKey: 'daily_him' },
  { id: 'her',  title: 'daily work',    TitleIcon: UserIcon,  items: DAILY_HER,  accentColor: '#5A7A6E', bgColor: '#F5FAF8', noteKey: 'daily_her' },
  { id: 'both', title: 'together today',TitleIcon: HeartIcon, items: DAILY_BOTH, accentColor: '#B8860B', bgColor: '#FFFBF0', noteKey: 'daily_both' },
];

export default function DailyView({ checked, onToggle, notes, onNote, settings }) {
  const streaks = loadStreaks();
  const allDone = ALL_DAILY.every(i => checked[i.id]);
  const him = settings?.himName || 'Him';
  const her = settings?.herName || 'Her';

  return (
    <>
      <StreakBar streaks={streaks} />
      {allDone && <div className="complete-badge">All daily tasks complete — well done both of you</div>}
      <RandomWisdom />
      <div className="pull-quote">
        <p>"Small things done consistently are the material of great love. Daily faithfulness is the thing you live inside."</p>
      </div>
      <Section title={`${him}'s daily work`} TitleIcon={p => <UserIcon {...p} color="#C0556A" />} items={SECTIONS[0].items} checked={checked} onToggle={onToggle} accentColor="#C0556A" bgColor="#FFF5F7" noteKey="daily_him" noteValue={notes['daily_him']} onNote={onNote} />
      <Section title={`${her}'s daily work`} TitleIcon={p => <UserIcon {...p} color="#5A7A6E" />} items={SECTIONS[1].items} checked={checked} onToggle={onToggle} accentColor="#5A7A6E" bgColor="#F5FAF8" noteKey="daily_her" noteValue={notes['daily_her']} onNote={onNote} />
      <Section title="Together today" TitleIcon={p => <HeartIcon {...p} color="#B8860B" />} items={SECTIONS[2].items} checked={checked} onToggle={onToggle} accentColor="#B8860B" bgColor="#FFFBF0" noteKey="daily_both" noteValue={notes['daily_both']} onNote={onNote} />
    </>
  );
}

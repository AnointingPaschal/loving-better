import { DAILY_HIM, DAILY_HER, DAILY_BOTH, ALL_DAILY } from '../data/tasks';
import { Section } from './CheckItem';
import StreakBar from './StreakBar';
import { loadStreaks } from '../utils/storage';

const SECTIONS = [
  {
    id: 'him', title: 'His daily work', emoji: '👨🏾', items: DAILY_HIM,
    colorClass: 'rose', accentColor: '#C0556A', bgColor: '#FFF5F7',
    noteKey: 'daily_him',
  },
  {
    id: 'her', title: 'Her daily work', emoji: '👩🏾', items: DAILY_HER,
    colorClass: 'sage', accentColor: '#5A7A6E', bgColor: '#F5FAF8',
    noteKey: 'daily_her',
  },
  {
    id: 'both', title: 'Together every day', emoji: '💛', items: DAILY_BOTH,
    colorClass: 'gold', accentColor: '#B8860B', bgColor: '#FFFBF0',
    noteKey: 'daily_both',
  },
];

export default function DailyView({ checked, onToggle, notes, onNote }) {
  const streaks = loadStreaks();
  const done = ALL_DAILY.filter(i => checked[i.id]).length;
  const allDone = done === ALL_DAILY.length;

  return (
    <>
      <StreakBar streaks={streaks} />

      {allDone && (
        <div className="complete-badge">
          🎉 All daily tasks complete — well done both of you!
        </div>
      )}

      <div className="pull-quote">
        <p>"Small things done consistently are the material of great love. Grand gestures are the moments you talk about. Daily faithfulness is the thing you live inside."</p>
      </div>

      {SECTIONS.map(s => (
        <Section
          key={s.id}
          title={s.title}
          emoji={s.emoji}
          items={s.items}
          checked={checked}
          onToggle={onToggle}
          colorClass={s.colorClass}
          accentColor={s.accentColor}
          bgColor={s.bgColor}
          noteKey={s.noteKey}
          noteValue={notes[s.noteKey]}
          onNote={onNote}
        />
      ))}
    </>
  );
}

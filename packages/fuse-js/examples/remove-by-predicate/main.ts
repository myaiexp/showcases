// fuse.remove(predicate): documents leave the index and come back as the return value
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button, select } from '../../shared/controls.ts';
import { docShelf } from '../../shared/doc-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, pills, textBox } from '../../shared/widgets.ts';

interface Task {
  title: string;
  list: 'home' | 'work';
  done: boolean;
}

const mk = (title: string, list: Task['list'], done = false): Task => ({ title, list, done });
const START = (): Task[] => [
  mk('Pay rent', 'home', true),
  mk('Call the plumber', 'home'),
  mk('Send the invoice', 'work', true),
  mk('Plan the sprint', 'work'),
  mk('Book the dentist', 'home', true),
  mk('Pay the supplier', 'work'),
  mk('Water the plants', 'home'),
  mk('Review the pay rise', 'work', true),
];

const RULES: [string, string, (t: Task) => boolean][] = [
  ['done', '(t) => t.done', (t) => t.done],
  ['home', "(t) => t.list === 'home'", (t) => t.list === 'home'],
  ['pay', "(t) => /pay/i.test(t.title)", (t) => /pay/i.test(t.title)],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Pick a rule and remove: the tiles leave, and the search no longer finds them.' });
  const box = searchBox(stage.root, stage, { value: 'pay', placeholder: 'Search tasks…' });
  const call = callLine(stage.root);
  const shelf = docShelf<Task>(stage.root, { label: (t) => `${t.done ? '✓ ' : ''}${t.title}${stage.preview ? '' : ` · ${t.list}`}` });
  const returned = textBox(stage.root);
  const info = pills(stage.root);

  // `tasks` is what the shelf draws; Fuse gets its own copy of the array.
  let tasks = START();
  const fuse = new Fuse([...tasks], { keys: ['title'], includeScore: true });
  let rule = RULES[0]!;
  let gone: Task[] = [];

  const run = (): void => {
    const q = box.value.trim();
    const results = q ? fuse.search(q) : [];
    shelf.sync(tasks);
    shelf.mark(q ? new Map(results.map((r) => [r.item, r.score] as const)) : null);
    info.set('in the index', fuse.getIndex().size());
    info.set(`match "${q}"`, results.length, results.length ? 'ok' : undefined);
  };
  const removeNow = (): void => {
    // remove() calls the predicate for every document and hands back the ones it removed.
    gone = fuse.remove(rule[2]);
    tasks = tasks.filter((t) => !gone.includes(t));
    call.set(`fuse.remove(${rule[1]})`);
    returned.textContent = `returned ${gone.length}: ${gone.map((t) => t.title).join(', ') || 'nothing'}`;
    run();
    stage.say(`${gone.length} removed; ${fuse.getIndex().size()} left in the index`, gone.length ? 'ok' : 'warn');
  };
  const putBack = (): void => {
    for (const t of gone) {
      fuse.add(t);
      tasks.push(t);
    }
    gone = [];
    returned.textContent = 'returned: put back with fuse.add()';
    call.set('fuse.add(doc)');
    run();
  };
  box.onInput(run);
  call.set('fuse.remove(predicate)');
  returned.textContent = 'returned: (nothing removed yet)';
  run();

  if (stage.preview) {
    let n = 0;
    stage.play(async (wait) => {
      rule = RULES[n++ % RULES.length]!;
      await wait(1600);
      removeNow();
      await wait(2400);
      putBack();
      await wait(800);
    });
  } else if (stage.bar) {
    select(stage.bar, 'remove tasks that are', RULES.map((r) => [r, r[0] === 'pay' ? 'about pay' : r[0] === 'done' ? 'done' : 'at home'] as const), (r) => (rule = r), rule);
    button(stage.bar, 'Remove', removeNow);
    button(stage.bar, 'Put them back', putBack);
    stage.say('A tick marks a finished task. Matches for the search box are lit.');
  }
  return stage.dispose;
};

export default mount;

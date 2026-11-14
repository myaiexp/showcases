// The same lists searched with findAllMatches off and on: highlights vs scores
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { columns } from '../../shared/widgets.ts';

// Some lists repeat the word, some have look-alikes (ample, maple, apply) after it.
const LISTS = [
  'pie the cake cake cake apples ample maple the apply tart',
  'pear pear ample cake apple maple ample apple the tart',
  'tart the apply with apple pear with',
  'jam tart cake the tart apples ample apply and',
  'apple pie with cream and a pear',
  'cake and apple tart',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same highlights in both columns: exact repeats are always found. The scores are what move.' });
  const box = searchBox(stage.root, stage, { value: 'apple', tries: ['apple', 'pear', 'cake', 'tart'] });
  const [off, on] = columns(stage, ['findAllMatches: false', 'findAllMatches: true']);
  const max = stage.preview ? 4 : 6;
  const left = resultList(off!.body, { max, ranks: false, empty: 'No matches' });
  const right = resultList(on!.body, { max, ranks: false, empty: 'No matches' });

  // Default location and distance, so each list is judged near its start.
  const stopEarly = new Fuse(LISTS, { includeMatches: true, includeScore: true });
  const readAll = new Fuse(LISTS, { includeMatches: true, includeScore: true, findAllMatches: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      left.show([], 'Type a word');
      right.show([], 'Type a word');
      stage.say('');
      return;
    }
    const a = stopEarly.search(query);
    const b = readAll.search(query);
    const toRows = (rs: typeof a) => rs.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item), score: r.score }));
    left.show(toRows(a));
    right.show(toRows(b));
    const worse = b.filter((r) => r.score !== undefined && (a.find((x) => x.refIndex === r.refIndex)?.score ?? r.score) < r.score - 0.005).length;
    stage.say(
      worse ? `${worse} of ${b.length} lists score worse when every word is read to the end` : `"${query}": the two columns agree`,
      worse ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  if (stage.preview) stage.cycle(['apple', 'pear', 'apple', 'tart'], 2200, (q) => box.set(q));
  return stage.dispose;
};

export default mount;

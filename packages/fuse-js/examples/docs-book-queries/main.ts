// The four queries from the Fuse.js docs' extended-search example, run over its books
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { groupOf } from '../../shared/ext-query.ts';
import { reading } from '../../shared/ext-reading.ts';
import { lightUp } from '../../shared/ext-shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';

// The docs' three books, plus a few more so there is something to rule out.
const BOOKS = [
  { title: "Old Man's War", author: 'John Scalzi' },
  { title: 'The Lock Artist', author: 'Steve Hamilton' },
  { title: 'Artist for Life', author: 'Michelangelo' },
  { title: 'Old Yeller', author: 'Fred Gipson' },
  { title: 'The Art of War', author: 'Sun Tzu' },
  { title: 'War and Peace', author: 'Leo Tolstoy' },
  { title: 'Cold Mountain', author: 'Charles Frazier' },
  { title: 'The Artist’s Way', author: 'Julia Cameron' },
];

// What the docs say each one means.
const STEPS = [
  { query: '^Old war', say: 'Starts with "Old" AND roughly "war"', short: 'Old… and war' },
  { query: '!Artist ^Old', say: 'Does NOT include "Artist" AND starts with "Old"', short: 'not Artist, Old…' },
  { query: "Artist$ | 'War", say: 'Ends with "Artist" OR includes "War"', short: 'Artist$ or War' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'These are the docs\' own queries. Edit them and watch the groups change.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Try ^Old war', tries: STEPS.map((s) => s.query) });
  const read = reading(stage.root);
  const tiles = shelf(stage.root, BOOKS.map((b, id) => ({ id, label: b.title })), { scores: false });

  // keys: ['title'], exactly as in the docs' example.
  const fuse = new Fuse(BOOKS, { useExtendedSearch: true, keys: ['title'] });

  const run = (query: string): void => {
    const groups = read.set(query);
    if (!groups.length) {
      lightUp(tiles, null);
      stage.say('Type a query');
      return;
    }
    const results = fuse.search(query);
    lightUp(tiles, results, { groups: groups.length > 1 ? groupOf(fuse, groups) : undefined });
    const step = STEPS.find((s) => s.query === query);
    const say = stage.preview ? step?.short : step?.say;
    stage.say(`${say ? `${say}: ` : ''}${results.length} of ${BOOKS.length} books`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);

  const show = stage.cycle(STEPS, 3200, (s) => box.set(s.query));
  let n = 0;
  if (!stage.preview) button(stage.bar!, 'Next query', () => show(++n));
  return stage.dispose;
};

export default mount;

// A plain list of fruit names searched with no keys: the matching tiles light up
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { FRUITS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, q } from '../../shared/widgets.ts';

const QUERIES = ['aple', 'banan', 'oranje', 'pech', 'grap'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The list holds plain strings, so there are no keys to name.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'aple', placeholder: 'Find a fruit…', tries: QUERIES });
  const call = callLine(stage.root);
  const fruit = shelf(stage.root, FRUITS.map((label, id) => ({ id, label })));

  // An array of strings needs no `keys`: every string is searched as it is.
  const fuse = new Fuse(FRUITS, { includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    call.set(`fuse.search(${q(query)})`);
    if (!query.trim()) {
      fruit.mark(null);
      stage.say('Type a fruit, even a misspelled one');
      return;
    }
    const results = fuse.search(query);
    const hits = new Map<number, Hit>();
    results.forEach((r, i) => hits.set(r.refIndex, { score: r.score, nodes: marked(r, undefined, r.item), rank: i + 1 }));
    fruit.mark(hits);
    const best = results[0];
    stage.say(
      best ? `"${query}" lights up ${results.length} of ${FRUITS.length} fruits; the closest is ${best.item}` : `Nothing on the shelf is close to "${query}"`,
      best ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES);
  return stage.dispose;
};

export default mount;

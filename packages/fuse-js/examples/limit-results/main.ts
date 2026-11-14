// search(query, { limit }) keeps only the best N matches out of a longer list
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine, q } from '../../shared/widgets.ts';

const ALL = [
  'Finland', 'Iceland', 'Ireland', 'Poland', 'Thailand', 'Netherlands', 'New Zealand', 'Switzerland', 'Scotland', 'England',
  'Greenland', 'Swaziland', 'Portugal', 'Spain', 'Italy', 'Norway', 'Sweden', 'Denmark', 'Estonia', 'Latvia',
  'Japan', 'Kenya', 'Chile', 'Peru', 'Canada', 'Mexico', 'Brazil', 'Egypt', 'India', 'Nepal',
];

// A card has room for four rows of tiles.
const STEPS = [3, 5, 8, 100];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise the limit to let more matches through, best first.' });
  const COUNTRIES = stage.preview ? ALL.slice(0, 16) : ALL;
  const box = searchBox(stage.root, stage, { value: 'land', placeholder: 'Find a country…', tries: ['land', 'ia', 'nor', 'sw'] });
  const call = callLine(stage.root);
  const map = shelf(stage.root, COUNTRIES.map((label, id) => ({ id, label })));
  let limit = STEPS[1]!;

  const fuse = new Fuse(COUNTRIES, { includeScore: true, includeMatches: true, threshold: 0.3 });

  const run = (): void => {
    const query = box.value;
    call.set(limit >= COUNTRIES.length ? `fuse.search(${q(query)})` : `fuse.search(${q(query)}, { limit: ${limit} })`);
    if (!query.trim()) {
      map.mark(null);
      stage.say('Type a few letters');
      return;
    }
    // The second argument caps the list at the best `limit` results.
    const best = fuse.search(query, { limit });
    const all = fuse.search(query).length;
    const hits = new Map<number, Hit>();
    best.forEach((r, i) => hits.set(r.refIndex, { score: r.score, nodes: marked(r, undefined, r.item), rank: i + 1 }));
    map.mark(hits);
    stage.say(
      all ? `Showing ${best.length} of ${all} matches (out of ${COUNTRIES.length} countries): the best ${best.length}, ranked` : `Nothing close to "${query}"`,
      all ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  if (stage.preview) stage.cycle(STEPS, 1800, (n) => ((limit = n), run()));
  else if (stage.bar) {
    slider(stage.bar, 'limit', 1, 12, 1, limit, (v) => ((limit = v), run()));
    run();
  }
  return stage.dispose;
};

export default mount;

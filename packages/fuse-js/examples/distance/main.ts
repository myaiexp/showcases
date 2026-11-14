// "coffee" sits further into each line: distance decides which lines are too far
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const LINES = [
  'coffee on the corner',
  'the cafe serves coffee all day',
  'a quiet corner, great views, coffee',
  'we walked an hour along the river, then coffee',
  'the museum, the market, the bridge, the park, then coffee',
];
const WORD = 'coffee';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The number after each line is where "coffee" starts. With the defaults a word further than threshold × distance is out.' });
  const info = stage.preview ? pills(stage.root) : null;
  const tiles = shelf(
    stage.root,
    LINES.map((label, id) => ({ id, label })),
    { layout: 'list' },
  );

  const run = (distance: number): void => {
    // ignoreFieldNorm keeps line length out of it, so only the distance moves the scores.
    const fuse = new Fuse(LINES, { distance, threshold: 0.5, ignoreFieldNorm: true, includeScore: true, includeMatches: true });
    const results = fuse.search(WORD);
    const hits = new Map<number, Hit>();
    results.forEach((r, i) => {
      const at = document.createElement('span');
      at.className = 'fz-badge';
      at.textContent = ` @${r.item.indexOf(WORD)}`;
      hits.set(r.refIndex, { score: r.score, rank: i + 1, nodes: [...marked(r, undefined, r.item), at] });
    });
    tiles.mark(hits);
    info?.set('distance', distance);
    stage.say(
      `${results.length} of ${LINES.length} lines are close enough to the start at distance ${distance}`,
      results.length > 1 ? 'ok' : 'warn',
    );
  };

  if (stage.preview) stage.cycle([10, 60, 100, 200, 30], 2000, run);
  else if (stage.bar) {
    slider(stage.bar, 'distance', 0, 250, 5, 100, run);
    run(100);
  }
  return stage.dispose;
};

export default mount;

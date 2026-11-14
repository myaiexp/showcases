// Five lines with "coffee" at different spots: location decides which one ranks first
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const LINES = [
  'coffee first, then a quiet walk',
  'a cup of coffee, then a quiet walk',
  'a long walk, then coffee and lunch',
  'lunch, a nap, a swim, and coffee',
  'tea and toast, then a long walk',
];
const WORD = 'coffee';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The row numbers are where "coffee" starts in each line. Slide location and watch the ranking follow it.' });
  const info = stage.preview ? pills(stage.root) : null;
  const list = resultList(stage.root, { max: stage.preview ? 4 : 5, ranks: true });

  const run = (location: number): void => {
    // Same lines, same word; only `location` (where the word is expected) changes.
    const fuse = new Fuse(LINES, { location, distance: 40, threshold: 0.5, includeScore: true, includeMatches: true });
    const results = fuse.search(WORD);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: marked(r, undefined, r.item),
        score: r.score,
        badge: `@${r.item.indexOf(WORD)}`,
      })),
    );
    info?.set('location', location);
    const top = results[0];
    stage.say(
      top ? `With location ${location}, the line whose "${WORD}" starts at ${top.item.indexOf(WORD)} ranks first` : `Nothing near location ${location}`,
      top ? 'ok' : 'warn',
    );
  };

  if (stage.preview) stage.cycle([0, 10, 20, 30, 20], 2000, run);
  else if (stage.bar) {
    slider(stage.bar, 'location', 0, 40, 1, 0, run);
    run(0);
  }
  return stage.dispose;
};

export default mount;

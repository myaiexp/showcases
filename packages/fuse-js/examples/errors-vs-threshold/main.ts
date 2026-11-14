// Five words with 0 to 4 mistakes against "test", and a threshold dial
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { highlight } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const PATTERN = 'test';
const WORDS: [string, number][] = [
  ['test', 0],
  ['text', 1],
  ['team', 2],
  ['tuna', 3],
  ['bold', 4],
];
const STEPS = [0.1, 0.3, 0.55, 0.8, 1, 0.1];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each mistake adds 0.25 here (1 letter in 4). A word passes when its score is at or below the threshold.' });
  const info = stage.preview ? pills(stage.root) : null;
  const list = resultList(stage.root, { max: 5, ranks: false, scores: true });

  const run = (threshold: number): void => {
    let passed = 0;
    list.show(
      WORDS.map(([word, errors]) => {
        // Fuse.match scores one pattern against one string, here with the dial as the threshold.
        const m = Fuse.match(PATTERN, word, { threshold, includeMatches: true, ignoreLocation: true });
        if (m.isMatch) passed++;
        return {
          id: word,
          title: m.isMatch ? highlight(word, m.indices) : word,
          badge: errors === 1 ? '1 mistake' : `${errors} mistakes`,
          score: m.isMatch ? m.score : undefined,
          tone: m.isMatch ? ('ok' as const) : ('dim' as const),
        };
      }),
    );
    info?.set('threshold', threshold.toFixed(2));
    stage.say(
      threshold >= 1 && passed < WORDS.length
        ? `Even at threshold 1, "bold" (4 wrong letters of 4) does not match: a score of 1 means nothing in common`
        : `${passed} of ${WORDS.length} words pass for "${PATTERN}" at threshold ${threshold.toFixed(2)}`,
      passed ? 'ok' : 'warn',
    );
  };

  if (stage.preview) stage.cycle(STEPS, 1700, run);
  else if (stage.bar) {
    slider(stage.bar, 'threshold', 0, 1, 0.05, 0.3, run, (v) => v.toFixed(2));
    run(0.3);
  }
  return stage.dispose;
};

export default mount;

// Flag the log lines that match a pattern, one Fuse.match call per line
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { highlight } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';

const LOG = [
  'ERROR disk almost full on /var',
  'WARN slow query took 2.3s',
  'INFO user signed in',
  'ERROR connection timeout to db',
  'INFO backup finished',
  'WARN certificate expires in 5 days',
];

// The card walks through a pattern with and without includeMatches.
const STEPS: [string, boolean][] = [
  ['eror', true],
  ['eror', false],
  ['timout', true],
  ['backup', false],
  ['warnin', true],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fuse.match(pattern, text, options) works on any string. Untick includeMatches: the same calls answer, but indices disappear.' });
  const box = searchBox(stage.root, stage, { value: 'eror', tries: ['eror', 'timout', 'backup', 'warnin', 'sign in'] });
  const list = resultList(stage.root, { max: 6, ranks: false, scores: false });
  let includeMatches = true;

  const run = (): void => {
    const pattern = box.value.trim();
    if (!pattern) {
      list.show([], 'Type a pattern');
      stage.say('');
      return;
    }
    let flagged = 0;
    list.show(
      LOG.map((line, id) => {
        // One call per line, no Fuse instance and no index.
        const r = Fuse.match(pattern, line, { threshold: 0.4, includeMatches });
        if (r.isMatch) flagged++;
        return {
          id,
          title: r.isMatch ? highlight(line, r.indices) : line,
          sub: stage.preview && !r.isMatch ? undefined : `{ isMatch: ${r.isMatch}, score: ${r.score.toFixed(2)}, indices: ${r.indices ? JSON.stringify(r.indices) : 'undefined'} }`,
          badge: r.isMatch ? 'flagged' : undefined,
          tone: r.isMatch ? ('ok' as const) : ('dim' as const),
        };
      }),
    );
    stage.say(
      `${flagged} of ${LOG.length} lines flagged` + (includeMatches ? '' : ': without includeMatches there are no indices to highlight'),
      flagged ? 'ok' : 'warn',
    );
  };

  box.onInput(run);
  if (stage.preview) {
    stage.cycle(STEPS, 2400, ([pattern, im]) => {
      includeMatches = im;
      box.set(pattern);
    });
  } else if (stage.bar) {
    checkbox(stage.bar, 'includeMatches', includeMatches, (v) => ((includeMatches = v), run()));
    run();
  }
  return stage.dispose;
};

export default mount;

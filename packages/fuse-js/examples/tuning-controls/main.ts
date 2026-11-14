// Threshold, location and distance on one list: which notes still count as a match
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

// "coffee" sits at the start, the middle and the end of these notes, and look-alike
// words (toffee, coffin, copy) sit near the start.
const NOTES = [
  'coffee beans from Kenya',
  'buy milk, bread and coffee',
  'toffee apples for the party',
  'coffin nails for the shed',
  'copy the report for Monday',
  'call the plumber about the leak in the kitchen, then pick up coffee',
  'cafe on the corner opens at eight',
];

interface Dials {
  threshold: number;
  location: number;
  distance: number;
  ignoreLocation: boolean;
}

const CARD_STEPS: Dials[] = [
  { threshold: 0.0, location: 0, distance: 100, ignoreLocation: false },
  { threshold: 0.3, location: 0, distance: 100, ignoreLocation: false },
  { threshold: 0.6, location: 0, distance: 100, ignoreLocation: false },
  { threshold: 0.3, location: 0, distance: 100, ignoreLocation: true },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Lower threshold = stricter. Small distance = the word must be near location.' });
  const box = searchBox(stage.root, stage, { value: 'coffee', tries: ['coffee', 'cofee', 'kofi', 'plumber', 'eight'] });
  const info = stage.preview ? pills(stage.root) : null;
  const notes = shelf(stage.root, NOTES.map((label, id) => ({ id, label })), { layout: 'list' });
  const dials: Dials = { ...CARD_STEPS[2]! };

  const run = (): void => {
    // The sliders show the dials in the full view; a card names them in pills instead.
    info?.set('threshold', dials.threshold.toFixed(2));
    info?.set('ignoreLocation', String(dials.ignoreLocation));
    // The three dials go straight into the options; Fuse is rebuilt on every change.
    const fuse = new Fuse(NOTES, { ...dials, includeScore: true, includeMatches: true });
    const results = fuse.search(box.value);
    const hits = new Map<number, Hit>();
    results.forEach((r, i) => hits.set(r.refIndex, { score: r.score, nodes: marked(r, undefined, r.item), rank: i + 1 }));
    notes.mark(box.value ? hits : null);
    stage.say(`${results.length} of ${NOTES.length} notes count as a match for "${box.value}"`, results.length ? 'ok' : 'warn');
  };

  if (stage.preview) {
    stage.cycle(CARD_STEPS, 2200, (step) => {
      Object.assign(dials, step);
      run();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'threshold', 0, 1, 0.05, dials.threshold, (v) => ((dials.threshold = v), run()), (v) => v.toFixed(2));
    slider(stage.bar, 'location', 0, 60, 1, dials.location, (v) => ((dials.location = v), run()));
    slider(stage.bar, 'distance', 0, 200, 5, dials.distance, (v) => ((dials.distance = v), run()));
    checkbox(stage.bar, 'ignoreLocation', dials.ignoreLocation, (v) => ((dials.ignoreLocation = v), run()));
    box.onInput(run);
    run();
  }
  return stage.dispose;
};

export default mount;

// The docs' own sentence: "zero" starts at 62, outside the default search window
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { checkbox, slider, textInput } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';
import { ruler } from './ruler.ts';
import './style.css';

const SENTENCE = 'Fuse.js is a powerful, lightweight fuzzy-search library, with zero dependencies';

interface Dials {
  threshold: number;
  distance: number;
  location: number;
  ignoreLocation: boolean;
}

const DEFAULTS: Dials = { threshold: 0.6, distance: 100, location: 0, ignoreLocation: false };
// The card walks through the ways to bring "zero" inside the window.
const CARD_STEPS: Dials[] = [
  DEFAULTS,
  { ...DEFAULTS, threshold: 0.7 },
  DEFAULTS,
  { ...DEFAULTS, distance: 200 },
  DEFAULTS,
  { ...DEFAULTS, location: 50 },
  DEFAULTS,
  { ...DEFAULTS, ignoreLocation: true },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Slide threshold, distance or location until the underlined word falls inside the shaded window.' });
  const info = stage.preview ? pills(stage.root) : null;
  const line = ruler(stage.root, SENTENCE);
  const dials: Dials = { ...DEFAULTS };
  let word = 'zero';

  const run = (): void => {
    // The window reaches threshold × distance letters either side of `location`.
    const reach = dials.ignoreLocation ? SENTENCE.length : Math.round(dials.threshold * dials.distance * 1e6) / 1e6;
    const at = word ? SENTENCE.indexOf(word) : -1;
    // The one Fuse call this example is about: one sentence, searched for one word.
    const fuse = new Fuse([SENTENCE], { ...dials, includeMatches: true });
    const found = word ? fuse.search(word)[0] : undefined;
    line.draw({
      window: [Math.ceil(dials.location - reach), Math.floor(dials.location + reach)],
      location: dials.location,
      word: at >= 0 ? [at, at + word.length - 1] : null,
      matched: found?.matches?.[0]?.indices ?? [],
    });
    info?.set('threshold', dials.threshold);
    info?.set('distance', dials.distance);
    info?.set('location', dials.location);
    if (dials.ignoreLocation) info?.set('ignoreLocation', 'true');
    else info?.set('window', `${Math.max(0, Math.ceil(dials.location - reach))}-${Math.floor(dials.location + reach)}`);
    if (at < 0) stage.say(word ? `"${word}" is not in the sentence` : 'Type a word from the sentence', 'warn');
    else if (found) {
      stage.say(
        dials.ignoreLocation ? `Found: with ignoreLocation the whole sentence counts` : `Found: "${word}" starts at ${at}, inside the window`,
        'ok',
      );
    } else stage.say(`Not found: "${word}" starts at ${at}, but the window ends at ${Math.floor(dials.location + reach)}`, 'bad');
  };

  if (stage.preview) {
    stage.cycle(CARD_STEPS, 2300, (step) => {
      Object.assign(dials, step);
      run();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'threshold', 0, 1, 0.01, dials.threshold, (v) => ((dials.threshold = v), run()), (v) => v.toFixed(2));
    slider(stage.bar, 'distance', 0, 200, 5, dials.distance, (v) => ((dials.distance = v), run()));
    slider(stage.bar, 'location', 0, 78, 1, dials.location, (v) => ((dials.location = v), run()));
    checkbox(stage.bar, 'ignoreLocation', dials.ignoreLocation, (v) => ((dials.ignoreLocation = v), run()));
    textInput(stage.bar, 'search for', word, (v) => ((word = v.trim()), run()), 8);
    run();
  }
  return stage.dispose;
};

export default mount;

// Tighten the threshold and token search stops matching loosely, word by word
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { searchBox } from '../../shared/search-box.ts';
import { shelf, type Hit } from '../../shared/shelf.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const RECIPES = [
  'Chicken noodle soup', 'Chicken curry', 'Tomato soup', 'Pea and ham soup', 'Chickpea stew', 'Cheese toastie', 'Chocolate cake',
  'Beef stew', 'Mushroom soup', 'Lemon chicken', 'Chili con carne', 'Soda bread', 'Sushi rolls', 'Pork chops',
];
const STEPS = [0.6, 0.4, 0.3, 0.2];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Too loose and almost everything counts; too tight and the misspelt word no longer finds its recipe.' });
  const box = searchBox(stage.root, stage, { value: 'chiken soap', tries: ['chiken soap', 'chicken soup', 'tomatto soup'] });
  const info = stage.preview ? pills(stage.root) : null;
  const tiles = shelf(stage.root, RECIPES.map((label, id) => ({ id, label })));
  let threshold = 0.6;

  const run = (): void => {
    info?.set('threshold', threshold.toFixed(1));
    // Rebuilt on every change: each query word is matched against the titles at this threshold.
    const fuse = new Fuse(RECIPES, { useTokenSearch: true, threshold, minMatchCharLength: 2, includeScore: true });
    const results = fuse.search(box.value);
    const hits = new Map<number, Hit>(results.map((r, i) => [r.refIndex, { score: r.score, rank: i + 1 }]));
    tiles.mark(box.value.trim() ? hits : null);
    stage.say(
      `${results.length} of ${RECIPES.length} recipes count at threshold ${threshold.toFixed(2)}`,
      results.length === 0 ? 'warn' : 'info',
    );
  };
  box.onInput(run);

  if (stage.preview) {
    stage.cycle(STEPS, 2200, (t) => {
      threshold = t;
      run();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'threshold', 0, 0.6, 0.05, threshold, (v) => ((threshold = v), run()), (v) => v.toFixed(2));
    run();
  }
  return stage.dispose;
};

export default mount;

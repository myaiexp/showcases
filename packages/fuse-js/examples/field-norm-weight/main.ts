// A fieldNormWeight dial from 0 to 2 over the same recipes, ranking reshuffling live
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { marked } from '../../shared/highlight.ts';
import { RECIPES } from '../../shared/recipes.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { pills } from '../../shared/widgets.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The long exact title and the short typos swap places somewhere between 1 and 2.' });
  const box = searchBox(stage.root, stage, { value: 'carbonara', tries: ['carbonara', 'spaghetti'] });
  const info = stage.preview ? pills(stage.root) : null;
  const list = resultList(stage.root, { max: stage.preview ? 5 : 7 });
  let weight = 1;

  const run = (): void => {
    if (!box.value.trim()) {
      list.show([], 'Type a dish');
      stage.say('');
      return;
    }
    // One option changes: how strongly the length of the title pulls the score.
    const fuse = new Fuse(RECIPES, { fieldNormWeight: weight, includeScore: true, includeMatches: true });
    const results = fuse.search(box.value);
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item), score: r.score })));
    info?.set('fieldNormWeight', weight);
    const long = results.findIndex((r) => r.item.length > 40) + 1;
    stage.say(long ? `The long title ranks ${long} of ${results.length} at fieldNormWeight ${weight}` : `${results.length} results`, 'ok');
  };

  box.onInput(run);
  if (stage.preview) {
    stage.cycle([0, 0.5, 1, 2], 2300, (w) => {
      weight = w;
      run();
    });
  } else if (stage.bar) {
    slider(stage.bar, 'fieldNormWeight', 0, 3, 0.1, weight, (v) => ((weight = v), run()), (v) => v.toFixed(1));
    run();
  }
  return stage.dispose;
};

export default mount;

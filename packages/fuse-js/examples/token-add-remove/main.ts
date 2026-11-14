// Adding and removing recipes with fuse.add and fuse.remove changes the token ranking
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { idfBars } from '../../shared/idf-bars.ts';
import { resultList } from '../../shared/results.ts';
import { createStage } from '../../shared/stage.ts';
import { paintWords, wordDots, wordHits, wordsOf } from '../../shared/token-marks.ts';
import { callLine, pills } from '../../shared/widgets.ts';

const START = ['Chicken soup', 'Chicken salad', 'Chicken curry', 'Saffron rice', 'Lemon rice', 'Garlic bread'];
const QUERY = 'chicken saffron';

interface Recipe {
  title: string;
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: `The query stays "${QUERY}". Add and remove recipes and watch the ranking and the weights move.` });
  const call = callLine(stage.root);
  const info = pills(stage.root);
  const chart = idfBars(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 4 : 7, ranks: true, scores: !stage.preview });

  let titles = [...START];
  const fuse = new Fuse<Recipe>(titles.map((title) => ({ title })), { keys: ['title'], useTokenSearch: true, threshold: 0.4, minMatchCharLength: 2, includeScore: true, includeMatches: true });
  let cakes = 0;

  const show = (code: string): void => {
    call.set(code);
    const terms = wordsOf(QUERY);
    const weights = chart.show(terms, titles);
    const results = fuse.search(QUERY);
    const hits = wordHits(fuse, terms);
    list.show(
      results.map((r) => ({
        id: r.item.title,
        title: paintWords(hits, r.refIndex, 'title', r.item.title),
        sub: stage.preview ? undefined : wordDots(hits, r.refIndex),
        score: r.score,
      })),
      'Nothing matches',
    );
    info.set('recipes', titles.length);
    const saffron = weights[1]!;
    stage.say(`"saffron" is in ${saffron.df} of ${titles.length} recipes, so its weight is ${saffron.idf.toFixed(2)}`, 'info');
  };

  // Every action changes the Fuse instance in place; the index follows.
  const actions = {
    stew: () => {
      fuse.add({ title: 'Chicken saffron stew' });
      titles.push('Chicken saffron stew');
      show("fuse.add({ title: 'Chicken saffron stew' })");
    },
    cake: () => {
      const title = `Saffron cake ${++cakes}`;
      fuse.add({ title });
      titles.push(title);
      show(`fuse.add({ title: '${title}' })`);
    },
    noSaffron: () => {
      fuse.remove((doc) => /saffron/i.test(doc.title));
      titles = titles.filter((t) => !/saffron/i.test(t));
      show('fuse.remove((doc) => doc.title has saffron)');
    },
    noChicken: () => {
      fuse.remove((doc) => /chicken/i.test(doc.title));
      titles = titles.filter((t) => !/chicken/i.test(t));
      show('fuse.remove((doc) => doc.title has chicken)');
    },
    reset: () => {
      titles = [...START];
      cakes = 0;
      fuse.setCollection(titles.map((title) => ({ title })));
      show('fuse.setCollection(recipes)');
    },
  };

  actions.reset();
  if (stage.preview) {
    stage.play(async (wait) => {
      await wait(1800);
      actions.stew();
      await wait(1800);
      for (let i = 0; i < 3; i++) {
        actions.cake();
        await wait(900);
      }
      await wait(1200);
      actions.noSaffron();
      await wait(1800);
      actions.reset();
    });
  } else if (stage.bar) {
    button(stage.bar, 'Add "Chicken saffron stew"', actions.stew);
    button(stage.bar, 'Add a saffron cake', actions.cake);
    button(stage.bar, 'Remove saffron recipes', actions.noSaffron);
    button(stage.bar, 'Remove chicken recipes', actions.noChicken);
    button(stage.bar, 'Start over', actions.reset);
  }
  return stage.dispose;
};

export default mount;

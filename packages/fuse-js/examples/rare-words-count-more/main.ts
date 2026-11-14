// A rare query word is worth more than a common one, drawn from the recipes themselves
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { idfBars } from '../../shared/idf-bars.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { matchedWords, paintWords, wordDots, wordHits, wordsOf } from '../../shared/token-marks.ts';

// "chicken" is in half the recipes; "saffron" in two.
const RECIPES = [
  'Roast chicken with lemon', 'Chicken noodle soup', 'Garlic chicken wings', 'Chicken tikka masala', 'Chicken and rice bake',
  'Saffron risotto', 'Chicken paella with saffron', 'Lemon rice', 'Tomato soup', 'Mushroom risotto', 'Pea soup', 'Beef stew',
].map((title) => ({ title }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'A word found in few recipes tells more than a word found in many, so it counts for more.' });
  const box = searchBox(stage.root, stage, { value: 'chicken saffron', tries: ['chicken saffron', 'chicken soup', 'rice saffron', 'soup tomato'] });
  const chart = idfBars(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 7, ranks: true, scores: !stage.preview });

  const fuse = new Fuse(RECIPES, { keys: ['title'], useTokenSearch: true, threshold: 0.4, minMatchCharLength: 2, includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    const terms = wordsOf(query);
    if (!terms.length) {
      chart.show([], []);
      list.show([], 'Type a few words');
      stage.say('');
      return;
    }
    // Bars of the docs' idf weight, worked out from the recipe titles.
    const idf = chart.show(terms, RECIPES.map((r) => r.title));

    const results = fuse.search(query);
    const hits = wordHits(fuse, terms);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: paintWords(hits, r.refIndex, 'title', r.item.title),
        sub: stage.preview ? undefined : wordDots(hits, r.refIndex),
        score: r.score,
      })),
      'No recipe has any of these words',
    );
    // Is there a rare-word-only recipe ranked above a common-word-only one?
    const rare = idf.indexOf(idf.reduce((a, b) => (b.idf > a.idf ? b : a)));
    const only = (word: number) => results.findIndex((r) => matchedWords(hits, r.refIndex).every((on, i) => on === (i === word)));
    const common = idf.indexOf(idf.reduce((a, b) => (b.idf < a.idf ? b : a)));
    const a = only(rare);
    const b = only(common);
    stage.say(
      terms.length > 1 && a >= 0 && b >= 0 && rare !== common
        ? `A recipe with only "${terms[rare]}" ranks ${a + 1}, a recipe with only "${terms[common]}" ranks ${b + 1}`
        : `${results.length} of ${RECIPES.length} recipes match`,
      a >= 0 && b >= 0 && a < b ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['chicken saffron', 'rice saffron', 'chicken soup']);
  return stage.dispose;
};

export default mount;

// A recipe with two of three query words still shows up, just below the ones with all three
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { matchedWords, paintWords, wordDots, wordHits, wordRow, wordsOf } from '../../shared/token-marks.ts';

const RECIPES = [
  'Spicy chicken noodle soup', 'Chicken noodle salad', 'Noodle soup', 'Chicken soup with rice', 'Garlic bread',
  'Beef noodle stew', 'Tomato soup', 'Chicken noodle soup with ginger', 'Mushroom risotto', 'Chicken wings',
].map((title) => ({ title }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The coloured chips show which query words each recipe contains.' });
  const box = searchBox(stage.root, stage, { value: 'chicken noodle soup', tries: ['chicken noodle soup', 'noodle soup ginger', 'chicken rice soup'] });
  const words = wordRow(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 4 : 8, ranks: true, scores: !stage.preview });

  // Default tokenMatch is 'any': a recipe needs only one of the words to be returned.
  const fuse = new Fuse(RECIPES, { keys: ['title'], useTokenSearch: true, threshold: 0.3, minMatchCharLength: 2, includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    const terms = wordsOf(query);
    words.set(terms);
    if (!terms.length) {
      list.show([], 'Type a few words');
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    const hits = wordHits(fuse, terms);
    const count = (ref: number): number => matchedWords(hits, ref).filter(Boolean).length;
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: paintWords(hits, r.refIndex, 'title', r.item.title),
        sub: stage.preview ? undefined : wordDots(hits, r.refIndex),
        badge: `${count(r.refIndex)}/${terms.length}`,
        score: r.score,
      })),
      'No recipe has any of these words',
    );
    const all = results.filter((r) => count(r.refIndex) === terms.length).length;
    stage.say(
      `${all} recipes have all ${terms.length} words; ${results.length - all} more have some and rank below`,
      results.length > all ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['chicken noodle soup', 'noodle soup ginger', 'chicken rice soup']);
  return stage.dispose;
};

export default mount;

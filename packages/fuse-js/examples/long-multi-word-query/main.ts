// A six-word query: read as one 39-letter pattern or as six short words
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { wordRow, wordsOf } from '../../shared/token-marks.ts';
import { columns, pills } from '../../shared/widgets.ts';

// The words of the query turn up in different orders and with other words in between.
const RECIPES = [
  'Quick weeknight chicken curry with rice, easy', 'Easy chicken curry', 'Rice pudding, quick and easy', 'Weeknight chicken stir fry',
  'Slow cooked beef curry', 'Creamy mushroom pasta', 'Chicken curry rice bowl for a quick easy weeknight',
  'Quick easy weeknight chicken curry rice', 'Lemon tart', 'Garlic bread',
].map((title) => ({ title }));

const LONG = 'quick easy weeknight chicken curry rice';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Delete words from the query: the one-pattern column needs all of them in that order, token search does not.' });
  const box = searchBox(stage.root, stage, { value: LONG, tries: [LONG, 'easy chicken curry', 'rice weeknight quick curry'] });
  const info = pills(stage.root);
  const words = wordRow(stage.root);
  const [plain, token] = columns(stage, ['Query as one pattern', 'Token search']);
  const max = stage.preview ? 3 : 6;
  const plainList = resultList(plain!.body, { max, ranks: false, scores: !stage.preview, empty: 'Nothing found' });
  const tokenList = resultList(token!.body, { max, ranks: false, scores: !stage.preview, empty: 'Nothing found' });

  const base = { keys: ['title'], threshold: 0.4, minMatchCharLength: 2, includeScore: true, includeMatches: true };
  const plainFuse = new Fuse(RECIPES, base);
  const tokenFuse = new Fuse(RECIPES, { ...base, useTokenSearch: true });

  const run = (query: string): void => {
    const terms = wordsOf(query);
    words.set(terms);
    info.set('words', terms.length);
    info.set('letters in the query', query.trim().length, query.trim().length > 32 ? 'warn' : undefined);
    const a = plainFuse.search(query);
    const b = tokenFuse.search(query);
    plainList.show(a.map((r) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title), score: r.score })));
    tokenList.show(b.map((r) => ({ id: r.refIndex, title: marked(r, 'title', r.item.title), score: r.score })));
    const bowl = RECIPES.findIndex((r) => r.title.startsWith('Chicken curry rice bowl'));
    const found = [a, b].map((res) => res.findIndex((r) => r.refIndex === bowl));
    stage.say(
      terms.length < 4
        ? 'Add more words to the query to make it long'
        : `"Chicken curry rice bowl…" has all the words in another order: ${found[0]! < 0 ? 'missed' : `rank ${found[0]! + 1}`} as one pattern, ${found[1]! < 0 ? 'missed' : `rank ${found[1]! + 1}`} by token search`,
      found[1]! >= 0 && found[0]! < 0 ? 'ok' : 'info',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, [LONG, 'rice weeknight quick curry']);
  return stage.dispose;
};

export default mount;

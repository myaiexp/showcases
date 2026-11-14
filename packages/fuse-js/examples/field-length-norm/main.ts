// Six titles that all contain the word exactly: only their length differs
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';

const TITLES = [
  "Grandma's famous Italian baked pasta casserole recipe made the way she always did",
  'Creamy garlic pasta with spinach',
  'Pasta',
  'A slow Sunday afternoon pasta bake with three cheeses',
  'Baked pasta casserole',
  'Pasta salad',
];
const words = (s: string): number => s.split(/\s+/).length;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The badge counts the words in the title. Try "bake" or "salad" too.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'pasta', tries: ['pasta', 'bake', 'salad', 'garlic'] });
  const list = resultList(stage.root, { max: stage.preview ? 5 : 6 });

  // ignoreLocation keeps the position of the word out of it: what is left is the field length.
  const fuse = new Fuse(TITLES, { ignoreLocation: true, includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], 'Type a word from a title');
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, undefined, r.item), badge: `${words(r.item)} words`, score: r.score })));
    const [first, last] = [results[0], results[results.length - 1]];
    stage.say(
      first && last && results.length > 1
        ? `Best: ${words(first.item)} word${words(first.item) > 1 ? 's' : ''} (${first.score?.toFixed(3)}). Worst: ${words(last.item)} words (${last.score?.toFixed(3)})`
        : `${results.length} of ${TITLES.length} titles match`,
      results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['pasta', 'bake', 'salad']);
  return stage.dispose;
};

export default mount;

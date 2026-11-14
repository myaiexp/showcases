// A key that holds an array: the tag chip that matched is the one that lights up
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { highlight, matchOf } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { callLine } from '../../shared/widgets.ts';
import './style.css';

const RECIPES = [
  { name: 'Pad thai', tags: ['noodles', 'peanut', 'quick'] },
  { name: 'Mushroom risotto', tags: ['rice', 'vegetarian', 'creamy'] },
  { name: 'Peanut stew', tags: ['vegan', 'peanut', 'spicy'] },
  { name: 'Ramen', tags: ['noodles', 'broth', 'spicy'] },
  { name: 'Veggie curry', tags: ['vegan', 'coconut', 'spicy'] },
  { name: 'Pancakes', tags: ['breakfast', 'sweet', 'quick'] },
];

const QUERIES = ['spicy', 'vegan', 'quik', 'noodle'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each recipe has several tags; only the matching ones light up.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'spicy', placeholder: 'Search by tag…', tries: QUERIES });
  const call = callLine(stage.root, `keys: ['tags']`);
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6 });

  // `tags` is an array, so Fuse searches every element and reports which one matched.
  const fuse = new Fuse(RECIPES, { keys: ['tags'], includeMatches: true, includeScore: true, threshold: 0.3 });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], `Type a tag to search ${RECIPES.length} recipes`);
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: r.item.name,
        sub: r.item.tags.map((tag, i) => {
          // matches[].refIndex is the position of the matching element inside `tags`.
          const hit = matchOf(r, 'tags', i);
          const chip = document.createElement('span');
          chip.className = hit ? 'ar-chip ar-hit' : 'ar-chip';
          chip.append(...highlight(tag, hit?.indices));
          return chip;
        }),
        score: r.score,
      })),
    );
    const first = results[0]?.matches?.[0];
    stage.say(
      first ? `${results.length} recipes have a tag like "${query}"; in the first, it is tag number ${(first.refIndex ?? 0) + 1}: "${first.value}"` : `No recipe has a tag like "${query}"`,
      first ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES.slice(0, 3));
  return stage.dispose;
};

export default mount;

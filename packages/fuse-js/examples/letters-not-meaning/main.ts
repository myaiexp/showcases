// Product search: misspelt names are found, descriptions of a need are not
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PRODUCTS } from '../../shared/data.ts';
import { marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';

// Queries that name a product, and queries that describe a need.
const NAMES = new Set(['mackbook', 'keybord', 'mm4', 'espreso', 'headfones']);
const NEEDS = new Set(['warm jacket', 'winter coat', 'something for coffee', 'music on the beach']);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Fuse is for finding things people already know the name of.' });
  const box = searchBox(stage.root, stage, { placeholder: 'Search the shop…', tries: [...NAMES, ...NEEDS] });
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6 });

  // The article's own setup: products searched by name, SKU and category.
  const fuse = new Fuse(PRODUCTS, { keys: ['name', 'sku', 'category'], threshold: 0.4, includeScore: true, includeMatches: true });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], `${PRODUCTS.length} products`);
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    list.show(results.map((r) => ({ id: r.refIndex, title: marked(r, 'name', r.item.name), sub: r.item.category, score: r.score })), 'Nothing: no product is spelt like that');
    const q = query.trim().toLowerCase();
    if (NEEDS.has(q)) stage.say(results.length ? 'Found by shared letters, not by meaning' : 'A description, not a name: Fuse finds nothing', 'warn');
    else if (NAMES.has(q)) stage.say(results.length ? 'A misspelt name: found anyway' : 'Not found', results.length ? 'ok' : 'warn');
    else stage.say(`${results.length} found`, results.length ? 'ok' : 'warn');
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['mackbook', 'warm jacket', 'keybord', 'winter coat']);
  return stage.dispose;
};

export default mount;

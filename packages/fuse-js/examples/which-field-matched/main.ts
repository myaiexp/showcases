// Each product hit is labelled with the field that matched: name, sku, category or description
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { PRODUCTS } from '../../shared/data.ts';
import { field, highlight, marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { snippet } from './snippet.ts';
import './style.css';

const QUERIES = ['audio', 'esp', 'laptop', 'shower', 'kitchen'];
const KEYS = ['name', 'sku', 'category', 'description'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The same word can match a name, a code, a category or the small print.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : 'audio', placeholder: 'Search the shop…', tries: QUERIES });
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6, scores: false });

  // Four keys, and includeMatches so every result lists the keys that matched.
  const fuse = new Fuse(PRODUCTS, { keys: [...KEYS], includeMatches: true, includeScore: true, ignoreLocation: true, threshold: 0.3 });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], `Type to search ${PRODUCTS.length} products`);
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: marked(r, 'name', r.item.name),
        // One labelled line per matches[] entry, labelled with its `key`.
        sub: (r.matches ?? [])
          .filter((m) => m.key !== 'name')
          .map((m) => {
            const cut = snippet(m.value ?? '', m.indices as [number, number][]);
            return field('wf-line', [field('wf-key', m.key ?? ''), ...highlight(cut.text, cut.indices)]);
          }),
      })),
    );
    const keys = [...new Set(results.flatMap((r) => r.matches?.map((m) => m.key) ?? []))];
    stage.say(
      results.length ? `${results.length} of ${PRODUCTS.length} products match "${query}", through: ${keys.join(', ')}` : `No product is close to "${query}"`,
      results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES.slice(0, 4));
  return stage.dispose;
};

export default mount;

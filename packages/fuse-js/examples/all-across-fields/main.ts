// With tokenMatch "all" the words may be spread over a record's title and description
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { resultList, type Row } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import { paintWords, wordHits, wordRow, wordsOf } from '../../shared/token-marks.ts';

const PRODUCTS = [
  { title: 'Red', description: 'cotton shirt' },
  { title: 'Red dress', description: 'silk' },
  { title: 'Blue shirt', description: 'linen, red buttons' },
  { title: 'Green hat', description: 'wool' },
  { title: 'Red shirt', description: 'wool' },
  { title: 'Shirt', description: 'plain white' },
  { title: 'Blue', description: 'wool hat' },
  { title: 'Wool scarf', description: 'blue and green' },
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Every query word must appear somewhere in the record, in any field. Greyed products are left out.' });
  const box = searchBox(stage.root, stage, { value: 'red shirt', tries: ['red shirt', 'blue wool hat', 'silk dress', 'wool blue'] });
  const words = wordRow(stage.root);
  const list = resultList(stage.root, { max: stage.preview ? 5 : 8, ranks: false, scores: false });

  const fuse = new Fuse(PRODUCTS, { keys: ['title', 'description'], useTokenSearch: true, tokenMatch: 'all', threshold: 0.3, minMatchCharLength: 2, includeMatches: true });

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
    const kept = new Set(results.map((r) => r.refIndex));
    const row = (p: (typeof PRODUCTS)[number], id: number): Row => ({
      id,
      title: paintWords(hits, id, 'title', p.title),
      sub: paintWords(hits, id, 'description', p.description),
      tone: kept.has(id) ? 'ok' : 'dim',
    });
    const rows = [...results.map((r) => row(r.item, r.refIndex)), ...PRODUCTS.flatMap((p, id) => (kept.has(id) ? [] : [row(p, id)]))];
    list.show(rows);
    const split = results.filter((r) => hits.per.every((m) => m.get(r.refIndex)?.matches?.length)).filter((r) => {
      // Words found in different fields of the same record.
      const keys = hits.per.map((m) => new Set(m.get(r.refIndex)?.matches?.map((x) => x.key)));
      return keys.every((k) => k.size === 1) && new Set(keys.map((k) => [...k][0])).size > 1;
    }).length;
    stage.say(
      `${results.length} of ${PRODUCTS.length} products have every word` + (split ? `, ${split} with the words in different fields` : ''),
      results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, ['red shirt', 'blue wool hat', 'wool blue']);
  return stage.dispose;
};

export default mount;

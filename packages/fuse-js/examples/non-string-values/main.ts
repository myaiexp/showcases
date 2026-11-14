// Order numbers and 64-bit tracking ids are searched as text, numbers and BigInts alike
import Fuse from 'fuse.js';
import type { Mount } from '@/types.ts';
import { field, marked } from '../../shared/highlight.ts';
import { resultList } from '../../shared/results.ts';
import { searchBox, typeLoop } from '../../shared/search-box.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

// `order` is a number and `tracking` is a BigInt: neither is a string.
const ORDERS = [
  { order: 48213, customer: 'Mia', tracking: 9007199254740993n },
  { order: 48299, customer: 'Leo', tracking: 1234567890123456789n },
  { order: 51234, customer: 'Zoe', tracking: 9876543210987654321n },
  { order: 90210, customer: 'Kim', tracking: 1122334455667788990n },
  { order: 52007, customer: 'Sam', tracking: 9007199254741010n },
  { order: 61880, customer: 'Ida', tracking: 5550123456789012345n },
];

const QUERIES = ['4821', '9007199', '5123', '12345678'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Type digits: part of an order number or of a tracking id.' });
  const box = searchBox(stage.root, stage, { value: stage.preview ? '' : '4821', placeholder: 'Order or tracking number…', tries: QUERIES });
  const list = resultList(stage.root, { max: stage.preview ? 3 : 6 });

  // Fuse turns numbers and BigInts into text while it indexes, so they need no conversion.
  const fuse = new Fuse(ORDERS, { keys: ['order', 'tracking'], includeMatches: true, includeScore: true, threshold: 0.3 });

  const run = (query: string): void => {
    if (!query.trim()) {
      list.show([], `Type digits to search ${ORDERS.length} orders`);
      stage.say('');
      return;
    }
    const results = fuse.search(query);
    list.show(
      results.map((r) => ({
        id: r.refIndex,
        title: [document.createTextNode('#'), ...marked(r, 'order', String(r.item.order))],
        sub: [field('nv-type', 'BigInt'), ...marked(r, 'tracking', String(r.item.tracking)), document.createTextNode(`  ·  ${r.item.customer}`)],
        badge: r.matches?.map((m) => (m.key === 'order' ? 'number' : 'bigint')).join(' + '),
        score: r.score,
      })),
    );
    stage.say(
      results.length ? `${results.length} of ${ORDERS.length} orders match "${query}", through a ${[...new Set(results[0]!.matches?.map((m) => (m.key === 'order' ? 'number' : 'BigInt')))].join(' and ')} field` : `No order or tracking number is close to "${query}"`,
      results.length ? 'ok' : 'warn',
    );
  };
  box.onInput(run);
  run(box.value);
  typeLoop(stage, box, QUERIES);
  return stage.dispose;
};

export default mount;

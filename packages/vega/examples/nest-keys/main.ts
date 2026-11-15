// nest keys decide the levels: region only, region then product, or product then region
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { orders } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const KEYSETS = [['region'], ['region', 'product'], ['product', 'region']];
const PANEL = 230;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = orders(3, 16);

  const spec: Spec = {
    width: PANEL * 3,
    height: 230,
    padding: { top: 25, left: 10, right: 10, bottom: 5 },
    autosize: 'none',
    // One nest pipeline per key list, each on its own copy of the rows (nest adds fields to the objects).
    data: KEYSETS.flatMap((keys, k) => [
      {
        name: `tree${k}`,
        values: rows.map((r) => ({ ...r })),
        transform: [
          { type: 'nest' as const, keys, generate: true },
          { type: 'tree' as const, method: 'tidy' as const, size: [PANEL - 30, 190] },
        ],
      },
      { name: `links${k}`, source: `tree${k}`, transform: [{ type: 'treelinks' as const }, { type: 'linkpath' as const }] },
    ]),
    scales: [{ name: 'depth', type: 'ordinal', domain: [0, 1, 2, 3], range: ['#e8a33d', '#6aa7e6', '#7fc97f', '#bbb'] }],
    marks: KEYSETS.flatMap((keys, k) => [
      {
        type: 'text' as const,
        encode: { enter: { x: { value: k * PANEL + 100 }, y: { value: -12 }, text: { value: `keys: ${keys.join(', ')}` }, align: { value: 'center' as const }, fill: { value: '#ddd' } } },
      },
      {
        type: 'path' as const,
        from: { data: `links${k}` },
        encode: { enter: { stroke: { value: '#777' }, x: { value: k * PANEL }, y: { value: 0 } }, update: { path: { field: 'path' } } },
      },
      {
        // Orders are the leaves; generated internal nodes carry a key and are drawn larger.
        type: 'symbol' as const,
        from: { data: `tree${k}` },
        encode: {
          enter: { stroke: { value: '#1a1a1a' } },
          update: {
            x: { field: 'x', offset: k * PANEL },
            y: { field: 'y' },
            fill: { scale: 'depth', field: 'depth' },
            size: { signal: 'datum.key ? 70 : 28' },
          },
        },
      },
      {
        type: 'text' as const,
        from: { data: `tree${k}` },
        encode: {
          enter: { fontSize: { value: 10 }, fill: { value: '#ddd' }, baseline: { value: 'middle' as const }, dx: { value: 8 } },
          update: {
            x: { field: 'x', offset: k * PANEL },
            y: { field: 'y' },
            text: { signal: 'datum.key ? datum.key : ""' },
          },
        },
      },
    ]),
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;

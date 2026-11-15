// generate: true keeps the internal nodes nest builds; false leaves only the input rows
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { orders } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 200,
    padding: { top: 30, left: 10, right: 10, bottom: 5 },
    autosize: 'none',
    signals: [{ name: 'generate', value: true, bind: { input: 'checkbox' } }],
    data: [
      {
        name: 'tree',
        values: orders(6, 14),
        transform: [
          { type: 'nest', keys: ['region', 'product'], generate: { signal: 'generate' } },
          { type: 'tree', method: 'tidy', size: [{ signal: 'width' }, { signal: 'height' }] },
        ],
      },
      { name: 'links', source: 'tree', transform: [{ type: 'treelinks' }, { type: 'linkpath' }] },
      // Count of rows that came out of nest: 14 inputs, plus the internal nodes when generated.
      { name: 'count', source: 'tree', transform: [{ type: 'aggregate', ops: ['count'], as: ['n'] }] },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['Tea', 'Coffee', 'Cocoa'], range: ['#c9a66b', '#9c6b4e', '#7fc97f'] }],
    marks: [
      {
        type: 'text',
        from: { data: 'count' },
        encode: {
          update: { x: { value: 0 }, y: { value: -14 }, fill: { value: '#ddd' }, text: { signal: "'rows out of nest: ' + datum.n" } },
        },
      },
      { type: 'path', from: { data: 'links' }, encode: { update: { stroke: { value: '#777' }, path: { field: 'path' } } } },
      {
        type: 'symbol',
        from: { data: 'tree' },
        encode: {
          enter: { stroke: { value: '#1a1a1a' } },
          update: {
            x: { field: 'x' },
            y: { field: 'y' },
            // generated internal nodes have a key; the input rows have a product
            fill: [{ test: 'datum.key', value: '#bbb' }, { scale: 'color', field: 'product' }],
            size: { signal: 'datum.key ? 90 : 60' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        encode: {
          enter: { fontSize: { value: 10 }, fill: { value: '#ddd' }, align: { value: 'center' }, dy: { value: -9 } },
          update: { x: { field: 'x' }, y: { field: 'y' }, text: { signal: 'datum.key ? datum.key : ""' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'generate', [false, true], 2400);
  return () => stage.dispose();
};

export default mount;

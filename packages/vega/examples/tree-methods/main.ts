// tidy packs subtrees tightly; cluster puts every leaf on the same level; separation spaces cousins
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { smallTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 400,
    height: 160,
    padding: 15,
    autosize: 'none',
    signals: [
      { name: 'method', value: 'tidy', bind: { input: 'select', options: ['tidy', 'cluster'] } },
      { name: 'separation', value: true, bind: { input: 'checkbox' } },
    ],
    data: [
      {
        name: 'tree',
        values: smallTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'tree', method: { signal: 'method' }, separation: { signal: 'separation' }, size: [{ signal: 'width' }, { signal: 'height' }] },
        ],
      },
      { name: 'links', source: 'tree', transform: [{ type: 'treelinks' }, { type: 'linkpath', shape: 'orthogonal' }] },
    ],
    scales: [{ name: 'color', type: 'ordinal', range: { scheme: 'category20' } }],
    marks: [
      { type: 'path', from: { data: 'links' }, encode: { update: { path: { field: 'path' }, stroke: { value: '#888' } } } },
      {
        type: 'symbol',
        from: { data: 'tree' },
        encode: {
          enter: { fill: { scale: 'color', field: 'id' }, stroke: { value: '#ddd' }, size: { value: 500 } },
          update: { x: { field: 'x' }, y: { field: 'y' } },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        encode: {
          enter: { align: { value: 'center' }, baseline: { value: 'middle' }, fill: { value: '#111' }, fontWeight: { value: 'bold' } },
          update: { x: { field: 'x' }, y: { field: 'y' }, text: { field: 'id' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { method: 'cluster', separation: true },
    { method: 'cluster', separation: false },
    { method: 'tidy', separation: false },
    { method: 'tidy', separation: true },
  ], 1600);
  return () => stage.dispose();
};

export default mount;

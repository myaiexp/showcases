// treelinks emits one source/target pair per parent-child edge of a stratified tree
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { smallTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300,
    height: 190,
    padding: 5,
    autosize: 'none',
    signals: [{ name: 'highlight', value: 0, bind: { input: 'range', min: 0, max: 8, step: 1 } }],
    data: [
      {
        name: 'tree',
        values: smallTree().map((r) => ({ ...r })),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'tree', method: 'tidy', size: [{ signal: 'width' }, 150] },
        ],
      },
      {
        name: 'links',
        source: 'tree',
        transform: [
          // No parameters: each output datum has a source and a target node object.
          { type: 'treelinks' },
          { type: 'window', ops: ['row_number'], as: ['n'] },
          { type: 'formula', as: 'from', expr: 'datum.source.id' },
          { type: 'formula', as: 'to', expr: 'datum.target.id' },
          { type: 'linkpath', shape: 'curve' },
        ],
      },
      rowsOf('table', 'links', 8),
    ],
    marks: [
      {
        type: 'path',
        from: { data: 'links' },
        encode: {
          update: {
            path: { field: 'path' },
            y: { value: 15 },
            stroke: [{ test: 'datum.n == highlight', value: 'orange' }, { value: '#888' }],
            strokeWidth: [{ test: 'datum.n == highlight', value: 3 }, { value: 1.5 }],
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'tree' },
        encode: {
          enter: { fill: { value: 'steelblue' }, stroke: { value: '#ddd' }, size: { value: 420 } },
          update: { x: { field: 'x' }, y: { field: 'y', offset: 15 } },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        encode: {
          enter: { align: { value: 'center' }, baseline: { value: 'middle' }, fill: { value: '#fff' }, fontWeight: { value: 'bold' } },
          update: { x: { field: 'x' }, y: { field: 'y', offset: 15 }, text: { field: 'id' } },
        },
      },
      // The right column lists the links; the highlighted row's edge turns orange in the tree.
      ...tableMarks('table', [{ field: '_r', title: '#', width: 28 }, { field: 'from', title: 'source', width: 52 }, { field: 'to', title: 'target', width: 52 }], { gap: 30 }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'highlight', [1, 2, 3, 4, 5, 6, 7, 8], 900);
  return () => stage.dispose();
};

export default mount;

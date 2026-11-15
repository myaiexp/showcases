// stratify turns id and parent columns into a tree; add rows and nodes join under their parents
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { smallTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = smallTree();

  const spec: Spec = {
    width: 300,
    height: 190,
    padding: 5,
    autosize: 'none',
    signals: [{ name: 'count', value: 9, bind: { input: 'range', min: 1, max: 9, step: 1 } }],
    data: [
      // The table on the right: the first `count` rows. Parents always come before children.
      {
        name: 'flat',
        values: rows.map((r) => ({ id: r.id, parent: r.parent, i: r.i })),
        transform: [{ type: 'filter', expr: 'datum.i < count' }],
      },
      rowsOf('table', 'flat', 9),
      {
        name: 'tree',
        values: rows.map((r) => ({ ...r })),
        transform: [
          { type: 'filter', expr: 'datum.i < count' },
          // key names each node, parentKey names its parent; the root's parent is null.
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'tree', method: 'tidy', size: [{ signal: 'width' }, 150] },
        ],
      },
      { name: 'links', source: 'tree', transform: [{ type: 'treelinks' }, { type: 'linkpath', shape: 'diagonal' }] },
    ],
    marks: [
      { type: 'path', from: { data: 'links' }, encode: { update: { path: { field: 'path' }, stroke: { value: '#888' }, y: { value: 15 } } } },
      {
        type: 'symbol',
        from: { data: 'tree' },
        encode: {
          enter: { fill: { value: 'steelblue' }, stroke: { value: '#ddd' }, size: { value: 500 } },
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
      ...tableMarks('table', [{ field: 'id', title: 'id', width: 40 }, { field: 'parent', title: 'parent', width: 60 }], { gap: 30 }),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'count', [1, 2, 3, 4, 5, 6, 7, 8, 9, 9], 800);
  return () => stage.dispose();
};

export default mount;

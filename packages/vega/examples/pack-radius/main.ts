// By default leaf area follows the field; a radius field sets leaf radii directly instead
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const SIDE = 260;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = packageTree().map((r) => ({ ...r, rad: r.size ? r.size * 0.35 : 0 }));

  const panel = (name: string, x: number) => ({
    type: 'symbol' as const,
    from: { data: name },
    sort: { field: 'datum.depth' },
    encode: {
      update: {
        x: { field: 'x', offset: x },
        y: { field: 'y' },
        size: { signal: '4 * datum.r * datum.r' },
        fill: { scale: 'color', field: 'branch' },
        fillOpacity: { signal: 'datum.children ? 0.15 : 0.85' },
        stroke: { signal: "datum.children ? '#777' : '#ddd'" },
      },
    },
  });

  const spec: Spec = {
    width: SIDE * 2 + 30,
    height: SIDE,
    padding: { top: 25, left: 5, right: 5, bottom: 5 },
    autosize: 'none',
    signals: [{ name: 'padding', value: 3, bind: { input: 'range', min: 0, max: 12, step: 1 } }],
    data: [
      {
        name: 'byArea',
        values: rows.map((r) => ({ ...r })),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          // sort takes tree nodes, so the value is node.value, the sum of the field below it
          { type: 'pack', field: 'size', sort: { field: 'value', order: 'descending' }, padding: { signal: 'padding' }, size: [SIDE, SIDE] },
        ],
      },
      {
        name: 'byRadius',
        values: rows.map((r) => ({ ...r })),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'pack', field: 'size', radius: 'rad', padding: { signal: 'padding' }, size: [SIDE, SIDE] },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: [
      { type: 'text', encode: { enter: { x: { value: SIDE / 2 }, y: { value: -10 }, text: { value: 'radius: null (area from field)' }, align: { value: 'center' }, fill: { value: '#ddd' } } } },
      { type: 'text', encode: { enter: { x: { value: SIDE + 30 + SIDE / 2 }, y: { value: -10 }, text: { value: "radius: 'rad' (field is the radius)" }, align: { value: 'center' }, fill: { value: '#ddd' } } } },
      panel('byArea', 0),
      panel('byRadius', SIDE + 30),
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'padding', [3, 10, 0, 6], 1600);
  return () => stage.dispose();
};

export default mount;

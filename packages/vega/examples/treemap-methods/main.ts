// All six treemap methods on the same data; resquarify stays put while squarify reshuffles
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const METHODS = ['squarify', 'resquarify', 'binary', 'dice', 'slice', 'slicedice'] as const;
const W = 200;
const H = 120;
const GAP = 22;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const rows = packageTree();
  const at = (i: number): { x: number; y: number } => ({ x: (i % 3) * (W + GAP), y: Math.floor(i / 3) * (H + 34) });

  const spec: Spec = {
    width: 3 * W + 2 * GAP,
    height: 2 * H + 34,
    padding: { top: 5, left: 5, right: 5, bottom: 5 },
    autosize: 'none',
    // Leaf sizes wobble with this phase; a stable method keeps boxes where they were.
    signals: [{ name: 'phase', value: 0, bind: { input: 'range', min: 0, max: 6.28, step: 0.05 } }],
    data: METHODS.map((method) => ({
      name: method,
      values: rows.map((r) => ({ ...r })),
      transform: [
        { type: 'formula' as const, as: 'w', expr: 'datum.size * (1 + 0.8 * sin(datum.i * 1.9 + phase))' },
        { type: 'stratify' as const, key: 'id', parentKey: 'parent' },
        { type: 'treemap' as const, field: 'w', method, paddingInner: 1, paddingOuter: 2, size: [W, H] },
      ],
    })),
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: METHODS.flatMap((method, i) => [
      {
        type: 'text' as const,
        encode: { enter: { x: { value: at(i).x + W / 2 }, y: { value: at(i).y + H + 14 }, text: { value: method }, align: { value: 'center' as const }, fill: { value: '#ddd' } } },
      },
      {
        type: 'rect' as const,
        from: { data: method },
        sort: { field: 'datum.depth' },
        interactive: false,
        encode: {
          update: {
            x: { field: 'x0', offset: at(i).x },
            x2: { field: 'x1', offset: at(i).x },
            y: { field: 'y0', offset: at(i).y },
            y2: { field: 'y1', offset: at(i).y },
            fill: { scale: 'color', field: 'branch' },
            fillOpacity: { signal: 'datum.depth == 0 ? 0.2 : datum.depth == 1 ? 0.4 : 0.9' },
          },
        },
      },
    ]),
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'phase', [0, 1.6, 3.2, 4.8], 1800);
  return () => stage.dispose();
};

export default mount;

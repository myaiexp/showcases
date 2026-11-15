// An icicle: each level is a row of rectangles whose widths add up to their parent's
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 180,
    padding: 5,
    autosize: 'none',
    signals: [
      { name: 'padding', value: 1, bind: { input: 'range', min: 0, max: 8, step: 1 } },
      // round snaps edges to whole pixels, so padded boxes stay crisp
      { name: 'round', value: false, bind: { input: 'checkbox' } },
    ],
    data: [
      {
        name: 'tree',
        values: packageTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'partition', field: 'size', padding: { signal: 'padding' }, round: { signal: 'round' }, size: [{ signal: 'width' }, { signal: 'height' }] },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: [
      {
        type: 'rect',
        from: { data: 'tree' },
        encode: {
          update: {
            x: { field: 'x0' },
            x2: { field: 'x1' },
            y: { field: 'y0' },
            y2: { field: 'y1' },
            fill: { scale: 'color', field: 'branch' },
            fillOpacity: { signal: 'datum.depth == 0 ? 0.35 : datum.depth == 1 ? 0.95 : 0.7' },
          },
          hover: { fillOpacity: { value: 1 } },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        interactive: false,
        encode: {
          enter: { baseline: { value: 'middle' }, align: { value: 'center' }, fill: { value: '#111' }, fontSize: { value: 10 } },
          update: {
            x: { signal: '(datum.x0 + datum.x1) / 2' },
            y: { signal: '(datum.y0 + datum.y1) / 2' },
            text: { signal: "datum.x1 - datum.x0 > 34 ? datum.name : ''" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [{ padding: 1, round: false }, { padding: 5, round: false }, { padding: 5, round: true }, { padding: 0, round: true }], 1700);
  return () => stage.dispose();
};

export default mount;

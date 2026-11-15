// squarify aims for boxes of a target aspect ratio: 1 for squares, higher for wide boxes
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 260,
    padding: 5,
    autosize: 'none',
    signals: [
      // Default is the golden ratio, (1 + sqrt(5)) / 2.
      { name: 'ratio', value: 1.618, bind: { input: 'range', min: 0.2, max: 6, step: 0.05 } },
      { name: 'round', value: true, bind: { input: 'checkbox' } },
    ],
    data: [
      {
        name: 'tree',
        values: packageTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          { type: 'treemap', field: 'size', method: 'squarify', ratio: { signal: 'ratio' }, round: { signal: 'round' }, paddingInner: 1, size: [{ signal: 'width' }, { signal: 'height' }] },
          // leaves only: the boxes whose shape the ratio steers
          { type: 'filter', expr: '!datum.children' },
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
            fillOpacity: { value: 0.9 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'tree' },
        interactive: false,
        encode: {
          enter: { align: { value: 'center' }, baseline: { value: 'middle' }, fill: { value: '#111' }, fontSize: { value: 10 } },
          update: {
            x: { signal: '(datum.x0 + datum.x1) / 2' },
            y: { signal: '(datum.y0 + datum.y1) / 2' },
            text: { signal: "datum.x1 - datum.x0 > 36 && datum.y1 - datum.y0 > 14 ? format((datum.x1 - datum.x0) / (datum.y1 - datum.y0), '.1f') : ''" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'ratio', [1.618, 0.5, 1, 3.5, 6], 1700);
  return () => stage.dispose();
};

export default mount;

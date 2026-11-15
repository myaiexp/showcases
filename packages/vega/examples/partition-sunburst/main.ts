// A sunburst: partition's x range is the angle, its y range the radius, drawn with arc marks
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycle } from '../../shared/cards.ts';
import { packageTree } from '../../shared/layout-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 300,
    height: 300,
    padding: 5,
    autosize: 'none',
    signals: [
      { name: 'gap', value: 0, bind: { input: 'range', min: 0, max: 20, step: 1 } },
      { name: 'radius', value: 145, update: 'width / 2 - 5' },
    ],
    data: [
      {
        name: 'tree',
        values: packageTree(),
        transform: [
          { type: 'stratify', key: 'id', parentKey: 'parent' },
          // size is [angle span, radius span]: the whole circle, out to the outer radius.
          { type: 'partition', field: 'size', padding: { signal: 'gap' }, size: [{ signal: '2 * PI' }, { signal: 'radius' }] },
        ],
      },
    ],
    scales: [{ name: 'color', type: 'ordinal', domain: ['app', 'ui', 'data', 'net', 'util', 'core'], range: { scheme: 'tableau10' } }],
    marks: [
      {
        type: 'arc',
        from: { data: 'tree' },
        encode: {
          enter: { stroke: { value: '#1a1a1a' }, x: { signal: 'width / 2' }, y: { signal: 'height / 2' } },
          update: {
            startAngle: { field: 'x0' },
            endAngle: { field: 'x1' },
            innerRadius: { field: 'y0' },
            outerRadius: { field: 'y1' },
            fill: { scale: 'color', field: 'branch' },
            fillOpacity: { signal: 'datum.depth == 0 ? 0.3 : datum.depth == 1 ? 0.95 : 0.7' },
          },
          hover: { fillOpacity: { value: 1 } },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  cycle(stage, view, 'gap', [0, 12, 4, 0], 1500);
  return () => stage.dispose();
};

export default mount;

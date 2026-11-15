// extent: the pixel box the fitted projection fills, margins included
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { cycleSteps } from '../../shared/cards.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 240,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'left', value: 20, bind: { input: 'range', min: 0, max: 220, step: 1 } },
      { name: 'pad', value: 20, bind: { input: 'range', min: 0, max: 100, step: 1 } },
      { name: 'picked', value: 76, bind: { input: 'select', options: [76, 356, 36, 710, 124], labels: ['Brazil', 'India', 'Australia', 'South Africa', 'Canada'] } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'equalEarth',
        fit: { signal: "data('selected')" },
        // extent is [[x0, y0], [x1, y1]]: the dashed box. size would be the same as [[0, 0], size].
        extent: { signal: '[[left, pad], [width - pad, height - pad]]' },
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule' }] },
      { name: 'selected', source: 'world', transform: [{ type: 'filter', expr: 'datum.id === picked' }] },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'graticule' },
        encode: { update: { stroke: { value: '#58627a' }, strokeWidth: { value: 0.6 }, fill: { value: null } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'shape',
        from: { data: 'world' },
        encode: { update: { stroke: { value: '#9db4d6' }, strokeWidth: { value: 0.4 }, fill: { value: '#2d4a73' } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'shape',
        from: { data: 'selected' },
        encode: { update: { fill: { value: '#c9742c' }, stroke: { value: '#ffd9a8' }, strokeWidth: { value: 1 } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'rect',
        encode: { update: { x: { signal: 'left' }, y: { signal: 'pad' }, x2: { signal: 'width - pad' }, y2: { signal: 'height - pad' }, fill: { value: null }, stroke: { value: '#f0b060' }, strokeDash: { value: [4, 3] } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { left: 20, pad: 20, picked: 76 }, { left: 200, pad: 20, picked: 356 }, { left: 60, pad: 70, picked: 36 }, { left: 20, pad: 20, picked: 124 }, { left: 140, pad: 40, picked: 710 },
  ], 1500);
  return () => stage.dispose();
};

export default mount;

// clipExtent: a pixel window the projected map is clipped to
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
      { name: 'x0', value: 90, bind: { input: 'range', min: 0, max: 220, step: 1 } },
      { name: 'y0', value: 50, bind: { input: 'range', min: 0, max: 120, step: 1 } },
      { name: 'x1', value: 350, bind: { input: 'range', min: 220, max: 440, step: 1 } },
      { name: 'y1', value: 190, bind: { input: 'range', min: 120, max: 240, step: 1 } },
    ],
    projections: [
      {
        name: 'projection',
        type: 'equirectangular',
        scale: 70,
        translate: [220, 120],
        // [[x0, y0], [x1, y1]] in pixels: drawing outside the window is cut off.
        // Nested arrays of signals do not work here: one signal expression gives the whole pair.
        clipExtent: { signal: '[[x0, y0], [x1, y1]]' },
      },
    ],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule' }] },
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
        type: 'rect',
        encode: { update: { x: { signal: 'x0' }, y: { signal: 'y0' }, x2: { signal: 'x1' }, y2: { signal: 'y1' }, fill: { value: null }, stroke: { value: '#f0b060' }, strokeDash: { value: [4, 3] } } },
      },
    ],
  };

  const view = await stage.render(spec);
  cycleSteps(stage, view, [
    { x0: 90, y0: 50, x1: 350, y1: 190 }, { x0: 20, y0: 20, x1: 200, y1: 110 }, { x0: 200, y0: 90, x1: 420, y1: 230 },
    { x0: 150, y0: 20, x1: 300, y1: 220 },
  ], 1300);
  return () => stage.dispose();
};

export default mount;

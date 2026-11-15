// Pan and zoom a flat map: drag moves translate, the wheel changes scale
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 440,
    height: 250,
    autosize: 'none',
    padding: 5,
    signals: [
      // Where the drag began, and the translate then.
      {
        name: 'anchor',
        value: [0, 0, 0, 0],
        on: [{ events: 'mousedown', update: '[x(), y(), tx, ty]' }],
      },
      // The projection's translate follows the pointer while the button is down.
      {
        name: 'tx',
        value: 220,
        on: [{ events: '[mousedown, window:mouseup] > window:mousemove', update: 'anchor[2] + x() - anchor[0]' }],
      },
      {
        name: 'ty',
        value: 125,
        on: [{ events: '[mousedown, window:mouseup] > window:mousemove', update: 'anchor[3] + y() - anchor[1]' }],
      },
      // The wheel scales the map about the translate point. The exponent keeps steps proportional.
      {
        name: 'scale',
        value: 70,
        on: [{ events: 'wheel!', update: 'clamp(scale * pow(1.003, -event.deltaY * pow(16, event.deltaMode)), 40, 1600)' }],
      },
    ],
    projections: [
      { name: 'projection', type: 'mercator', scale: { signal: 'scale' }, translate: [{ signal: 'tx' }, { signal: 'ty' }] },
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
        type: 'text',
        encode: {
          update: {
            x: { value: 4 },
            y: { value: 14 },
            fill: { value: '#f0b060' },
            fontSize: { value: 13 },
            text: { signal: "'scale ' + round(scale) + ', translate [' + round(tx) + ', ' + round(ty) + ']  (drag, wheel)'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: a pretend pointer drags the map and turns the wheel, in a loop of four gestures.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    stage.every(1400, async (i) => {
      const step = i % 4;
      if (step === 0) await ghost.drag([200, 120], [120, 150], 700, 14);
      else if (step === 1) for (let k = 0; k < 6; k++) { ghost.wheel(150, 140, -120); await view.runAsync(); }
      else if (step === 2) await ghost.drag([150, 140], [260, 90], 700, 14);
      else for (let k = 0; k < 6; k++) { ghost.wheel(260, 90, 120); await view.runAsync(); }
    });
  }
  return () => stage.dispose();
};

export default mount;

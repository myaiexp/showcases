// Drag a globe to turn it: pointer movement drives the rotate signals
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
      { name: 'scale', value: 110, bind: { input: 'range', min: 60, max: 220, step: 1 } },
      // Where the drag began, and the rotation then.
      { name: 'anchor', value: [0, 0, 0, 0], on: [{ events: 'mousedown', update: '[x(), y(), lon, lat]' }] },
      // Moving the pointer a full globe radius turns the globe about 90 degrees.
      {
        name: 'lon',
        value: -20,
        on: [{ events: '[mousedown, window:mouseup] > window:mousemove', update: 'anchor[2] + (x() - anchor[0]) * 90 / scale' }],
      },
      {
        name: 'lat',
        value: -25,
        on: [{ events: '[mousedown, window:mouseup] > window:mousemove', update: 'clamp(anchor[3] - (y() - anchor[1]) * 90 / scale, -90, 90)' }],
      },
    ],
    projections: [
      {
        name: 'projection',
        type: 'orthographic',
        scale: { signal: 'scale' },
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
        rotate: [{ signal: 'lon' }, { signal: 'lat' }, 0],
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
        type: 'text',
        encode: {
          update: {
            x: { value: 4 },
            y: { value: 14 },
            fill: { value: '#f0b060' },
            fontSize: { value: 13 },
            text: { signal: "'rotate [' + round(lon) + ', ' + round(lat) + ']  (drag the globe)'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: a pretend pointer swings the globe left, then right and down, then back.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const moves: [[number, number], [number, number]][] = [
      [[260, 120], [140, 120]],
      [[160, 100], [280, 150]],
      [[250, 150], [210, 70]],
    ];
    stage.every(1300, (i) => {
      const m = moves[i % moves.length];
      return m ? ghost.drag(m[0], m[1], 900, 16) : undefined;
    });
  }
  return () => stage.dispose();
};

export default mount;

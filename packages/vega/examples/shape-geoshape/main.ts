// Shape marks draw geoshape output: a world map you can rotate
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 430, height: 240, autosize: 'none', padding: 5,
    signals: [
      { name: 'type', value: 'orthographic', bind: { input: 'select', options: ['albers', 'azimuthalEqualArea', 'conicEqualArea', 'equirectangular', 'mercator', 'orthographic', 'stereographic', 'transverseMercator'] } },
      { name: 'scale', value: 105, bind: { input: 'range', min: 40, max: 400, step: 1 } },
      { name: 'rotate0', value: 20, bind: { input: 'range', min: -180, max: 180, step: 1 } },
      { name: 'rotate1', value: -20, bind: { input: 'range', min: -90, max: 90, step: 1 } },
    ],
    projections: [{
      name: 'projection',
      type: { signal: 'type' },
      scale: { signal: 'scale' },
      rotate: [{ signal: 'rotate0' }, { signal: 'rotate1' }, 0],
      translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
    }],
    data: [
      { name: 'world', url: 'data/world-110m.json', format: { type: 'topojson', feature: 'countries' } },
      { name: 'graticule', transform: [{ type: 'graticule' }] },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'graticule' },
        encode: { update: { strokeWidth: { value: 0.7 }, stroke: { value: '#58627a' }, fill: { value: null } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'shape',
        from: { data: 'world' },
        encode: {
          update: { strokeWidth: { value: 0.5 }, stroke: { value: '#9db4d6' }, fill: { value: '#2d4a73' } },
          hover: { fill: { value: 'orange' } },
        },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
    ],
  };

  const view = await stage.render(spec);

  if (stage.preview) stage.every(120, (i) => view.signal('rotate0', (i * 6) % 360 - 180).runAsync().then(() => undefined));
  return () => stage.dispose();
};

export default mount;

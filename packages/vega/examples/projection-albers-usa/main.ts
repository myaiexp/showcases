// albersUsa: one projection that tucks Alaska and Hawaii in under the lower 48
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 460,
    height: 270,
    autosize: 'none',
    padding: 5,
    signals: [
      { name: 'zoom', value: 1, bind: { input: 'range', min: 0.6, max: 1.2, step: 0.01 } },
      { name: 'hover', value: null, on: [
        { events: '@dot:mouseover', update: 'datum' },
        { events: '@dot:mouseout', update: 'null' },
      ] },
    ],
    // The default scale, 1070, fits a 960 x 500 area; 500 fits this smaller one.
    projections: [
      {
        name: 'projection',
        type: 'albersUsa',
        scale: { signal: '500 * zoom' },
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    data: [
      { name: 'states', url: 'data/us-10m.json', format: { type: 'topojson', feature: 'states' } },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        // geopoint writes the projected pixel position to x and y.
        transform: [{ type: 'geopoint', projection: 'projection', fields: ['lon', 'lat'] }],
      },
    ],
    marks: [
      {
        type: 'shape',
        from: { data: 'states' },
        encode: { update: { fill: { value: '#2f5d50' }, stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.6 } } },
        transform: [{ type: 'geoshape', projection: 'projection' }],
      },
      {
        type: 'symbol',
        name: 'dot',
        from: { data: 'capitals' },
        encode: {
          update: {
            x: { field: 'x' },
            y: { field: 'y' },
            size: { value: 30 },
            fill: { value: '#f0b060' },
            stroke: { value: '#222' },
            strokeWidth: { value: 0.5 },
          },
          hover: { size: { value: 110 }, fill: { value: '#fff' } },
        },
      },
      {
        type: 'text',
        encode: {
          update: {
            x: { value: 6 },
            y: { value: 262 },
            fill: { value: '#f0b060' },
            fontSize: { value: 14 },
            text: { signal: "hover ? hover.city + ', ' + hover.state : 'hover a capital'" },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: a pretend pointer visits the capitals one by one, Alaska and Hawaii included.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const dots = view.data('capitals') as { x: number; y: number }[];
    const order = [0, 1, 10, 4, 32, 22, 12, 40, 2, 9];
    stage.every(650, (i) => {
      const d = dots[order[i % order.length] ?? 0];
      if (d) ghost.move(d.x, d.y);
    });
  }
  return () => stage.dispose();
};

export default mount;

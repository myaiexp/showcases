// geopath: GeoJSON states turned into SVG path strings that a path mark draws
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
      { name: 'hover', value: null, on: [{ events: '@state:mouseover', update: 'datum.id' }, { events: '@state:mouseout', update: 'null' }] },
    ],
    projections: [
      { name: 'projection', type: 'albersUsa', scale: 500, translate: [220, 125] },
    ],
    data: [
      {
        name: 'states',
        url: 'data/us-10m.json',
        format: { type: 'topojson', feature: 'states' },
        // geopath writes a path string to the field `path` of every state.
        transform: [{ type: 'geopath', projection: 'projection' }],
      },
      {
        name: 'capitals',
        url: 'data/us-state-capitals.json',
        transform: [{ type: 'geopoint', projection: 'projection', fields: ['lon', 'lat'] }],
      },
    ],
    marks: [
      {
        type: 'path',
        name: 'state',
        from: { data: 'states' },
        encode: {
          update: { path: { field: 'path' }, fill: { value: '#2f5d50' }, stroke: { value: '#9ad6bf' }, strokeWidth: { value: 0.6 } },
          hover: { fill: { value: '#c9742c' } },
        },
      },
    ],
  };

  const view = await stage.render(spec);

  // Cards: a pretend pointer passes over the states, which light up one by one.
  if (stage.preview) {
    const ghost = stage.ghost(view);
    const caps = view.data('capitals') as { x: number; y: number }[];
    const order = [4, 32, 43, 8, 22, 36, 12, 34];
    stage.every(700, (i) => {
      const c = caps[order[i % order.length] ?? 0];
      if (c) ghost.move(c.x, c.y);
    });
  }
  return () => stage.dispose();
};

export default mount;

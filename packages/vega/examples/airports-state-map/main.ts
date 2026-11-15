// TopoJSON states drawn through an albersUsa projection and geopath
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  // The tutorial's spec, with the map and text recoloured for the dark page
  // (states #dedede on white, black routes and title in the original).
  const spec: Spec = {
    width: 900,
    height: 560,
    padding: { top: 0, left: 0, right: 0, bottom: 0 },
    autosize: 'none',
    data: [
      {
        name: 'states',
        url: 'data/us-10m.json',
        format: { type: 'topojson', feature: 'states' },
        transform: [{ type: 'geopath', projection: 'projection' }],
      },
    ],
    projections: [
      {
        name: 'projection',
        type: 'albersUsa',
        scale: 1200,
        translate: [{ signal: 'width / 2' }, { signal: 'height / 2' }],
      },
    ],
    marks: [
      {
        type: 'path',
        from: { data: 'states' },
        encode: {
          enter: { fill: { value: '#2c3444' }, stroke: { value: '#141820' } },
          update: { path: { field: 'path' } },
        },
      },
    ],
  };

  await stage.render(spec);
  return () => stage.dispose();
};

export default mount;

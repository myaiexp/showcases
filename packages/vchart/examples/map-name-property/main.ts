// nameProperty: match the data to a different property of the map's features than `name`
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { WORLD_GEOJSON } from '../../shared/world.ts';

// The same countries with an extra `code` property (the ISO numeric id the dataset carries).
const WITH_CODES = {
  type: 'FeatureCollection' as const,
  features: WORLD_GEOJSON.features.map((f) => ({ ...f, properties: { ...f.properties, code: String(f.id) } })),
};
const MAP = 'vchart-world-with-codes';
let registered = false;

const ROWS = [
  { name: 'Brazil', code: '076', value: 90 }, { name: 'India', code: '356', value: 75 },
  { name: 'Canada', code: '124', value: 55 }, { name: 'Egypt', code: '818', value: 40 },
  { name: 'Australia', code: '036', value: 65 }, { name: 'France', code: '250', value: 30 },
  { name: 'Mexico', code: '484', value: 80 }, { name: 'Russia', code: '643', value: 20 },
];
const PROPS = ['name', 'code'];

const mount: Mount = (el, ctx) => {
  if (!registered) {
    registered = true;
    VChart.registerMap(MAP, WITH_CODES, { type: 'geojson' });
  }
  return mountLive<{ prop: string }>(el, ctx, {
    initial: { prop: 'name' },
    mode: 'rebuild',
    previewMs: 1800,
    chart: { height: 460 },
    build: ({ prop }) =>
      ({
        type: 'map',
        map: MAP,
        nameProperty: prop,
        nameField: prop,
        valueField: 'value',
        data: [{ id: 'values', values: ROWS }],
        color: { type: 'linear', range: ['#3b4a8f', '#f4c95d', '#ef5a4c'] },
        area: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' } } },
        defaultFillColor: 'rgba(255,255,255,0.1)',
        title: { visible: !ctx.preview, text: `nameProperty: '${prop}', nameField: '${prop}'` },
      }) as unknown as ISpec,
    step: (s) => ({ prop: s.prop === 'name' ? 'code' : 'name' }),
    controls: (bar, live) => {
      select(bar, 'nameProperty', PROPS, (prop) => live.set({ prop }));
    },
  });
};

export default mount;

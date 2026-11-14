// region.projection zoom and center: open the map already framed on a part of the world
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { COUNTRY_NAMES, WORLD_GEO, countryValues, registerWorldMaps } from '../../shared/world.ts';

// [longitude, latitude] and a zoom for each framing.
const VIEWS: Record<string, { center: [number, number]; zoom: number }> = {
  World: { center: [10, 20], zoom: 1 },
  Europe: { center: [15, 52], zoom: 4 },
  'East Asia': { center: [115, 33], zoom: 3.2 },
  'South America': { center: [-60, -15], zoom: 2.4 },
  Africa: { center: [20, 2], zoom: 2.2 },
};
const NAMES = Object.keys(VIEWS);

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  const values = countryValues(COUNTRY_NAMES, 21);
  return mountLive<{ view: string }>(el, ctx, {
    initial: { view: 'World' },
    mode: 'rebuild',
    previewMs: 1800,
    chart: { height: 460 },
    build: ({ view }) =>
      ({
        type: 'map',
        map: WORLD_GEO,
        nameField: 'name',
        valueField: 'value',
        region: [{ projection: { type: 'equirectangular', ...VIEWS[view] } }],
        data: [{ id: 'values', values }],
        color: { type: 'linear', range: ['#2b2f5a', '#3f7fd0', '#f4c95d', '#ef5a4c'] },
        area: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' }, stroke: 'rgba(255,255,255,0.25)', lineWidth: 0.5 } },
        title: { visible: !ctx.preview, text: `${view}: ${JSON.stringify(VIEWS[view])}` },
      }) as unknown as ISpec,
    step: (_s, i) => ({ view: NAMES[i % NAMES.length] ?? 'World' }),
    controls: (bar, live) => {
      select(bar, 'projection center and zoom', NAMES, (view) => live.set({ view }));
    },
  });
};

export default mount;

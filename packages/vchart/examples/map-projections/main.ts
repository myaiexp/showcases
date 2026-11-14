// region.projection.type: the same world under different map projections
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { COUNTRY_NAMES, WORLD_GEO, countryValues, registerWorldMaps } from '../../shared/world.ts';

const PROJECTIONS = [
  'mercator', 'equirectangular', 'equalEarth', 'naturalEarth1', 'orthographic',
  'azimuthalEqualArea', 'stereographic', 'conicEqualArea', 'transverseMercator',
];

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  const values = countryValues(COUNTRY_NAMES, 5);
  return mountLive<{ type: string }>(el, ctx, {
    initial: { type: 'mercator' },
    mode: 'rebuild',
    previewMs: 1700,
    chart: { height: 460 },
    build: ({ type }) =>
      ({
        type: 'map',
        map: WORLD_GEO,
        nameField: 'name',
        valueField: 'value',
        region: [{ projection: { type } }],
        data: [{ id: 'values', values }],
        color: { type: 'linear', range: ['#2b2f5a', '#3f7fd0', '#f4c95d'] },
        area: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' }, stroke: 'rgba(255,255,255,0.25)', lineWidth: 0.5 } },
        title: { visible: !ctx.preview, text: type },
      }) as unknown as ISpec,
    step: (s) => ({ type: PROJECTIONS[(PROJECTIONS.indexOf(s.type) + 1) % PROJECTIONS.length] ?? 'mercator' }),
    controls: (bar, live) => {
      select(bar, 'projection.type', PROJECTIONS, (type) => live.set({ type }));
    },
  });
};

export default mount;

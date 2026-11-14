// nameMap: renames the map's geographic names so they match the names used in the data
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { WORLD_TOPO, registerWorldMaps } from '../../shared/world.ts';

// The data speaks in short names; the base map's names are 'United States of America' and so on.
const DATA = [
  ['USA', 82], ['Russia', 40], ['China', 95], ['Brazil', 55], ['India', 70], ['DR Congo', 25],
  ['UK', 60], ['Germany', 72], ['France', 66], ['Australia', 48], ['Canada', 52],
].map(([name, value]) => ({ name, value }));
const NAME_MAP = { 'United States of America': 'USA', 'Dem. Rep. Congo': 'DR Congo', 'United Kingdom': 'UK' };
const MODES = ['nameMap on', 'nameMap off'] as const;
type Mode = (typeof MODES)[number];

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  return mountLive<{ mode: Mode }>(el, ctx, {
    initial: { mode: 'nameMap on' },
    mode: 'rebuild',
    previewMs: 1800,
    chart: { height: 460 },
    build: ({ mode }) =>
      ({
        type: 'map',
        map: WORLD_TOPO,
        nameField: 'name',
        valueField: 'value',
        // Without nameMap, USA, UK and DR Congo match no region and stay unfilled.
        ...(mode === 'nameMap on' ? { nameMap: NAME_MAP } : {}),
        data: [{ id: 'values', values: DATA }],
        color: { type: 'linear', range: ['#3b4a8f', '#f4c95d', '#ef5a4c'] },
        area: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' } } },
        defaultFillColor: 'rgba(255,255,255,0.1)',
        title: { visible: !ctx.preview, text: mode },
      }) as unknown as ISpec,
    step: (s) => ({ mode: s.mode === 'nameMap on' ? 'nameMap off' : 'nameMap on' }),
    controls: (bar, live) => {
      select(bar, 'nameMap', MODES, (v) => live.set({ mode: v as Mode }));
    },
  });
};

export default mount;

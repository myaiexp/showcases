// region.roam and zoomLimit: drag and wheel-zoom the map, within a minimum and maximum scale
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { select } from '../../shared/chart.ts';
import { mountLive } from '../../shared/live-spec.ts';
import { COUNTRY_NAMES, WORLD_GEO, countryValues, registerWorldMaps } from '../../shared/world.ts';

interface State {
  roam: boolean;
  max: number;
  /** Preview only: stands in for the reader's wheel, through the projection's zoom. */
  zoom: number;
}

const ZOOMS = [1, 2, 3.5, 5, 3, 1.5];

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  const values = countryValues(COUNTRY_NAMES, 12);
  return mountLive<State>(el, ctx, {
    initial: { roam: true, max: 6, zoom: 1 },
    mode: 'rebuild',
    previewMs: 1600,
    chart: { height: 460 },
    build: ({ roam, max, zoom }) =>
      ({
        type: 'map',
        map: WORLD_GEO,
        nameField: 'name',
        valueField: 'value',
        region: [
          {
            roam,
            zoomLimit: { min: 1, max },
            projection: { type: 'equirectangular', zoom, center: [10, 20] },
          },
        ],
        data: [{ id: 'values', values }],
        color: { type: 'linear', range: ['#2b2f5a', '#3f7fd0', '#f4c95d'] },
        area: { style: { fill: { scale: 'color', field: 'value', changeDomain: 'replace' }, stroke: 'rgba(255,255,255,0.25)', lineWidth: 0.5 } },
      }) as unknown as ISpec,
    step: (_s, i) => ({ zoom: ZOOMS[i % ZOOMS.length] ?? 1 }),
    controls: (bar, live) => {
      const note = document.createElement('span');
      note.textContent = 'drag to pan, scroll to zoom';
      bar.append(note);
      select(bar, 'roam', ['true', 'false'], (v) => live.set({ roam: v === 'true' }));
      select(bar, 'zoomLimit.max', ['2', '6', '12'], (v) => live.set({ max: Number(v) })).value = '6';
    },
  });
};

export default mount;

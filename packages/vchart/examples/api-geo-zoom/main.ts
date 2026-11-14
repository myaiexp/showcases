// geoZoomByIndex: zoom a map region around a centre point from code
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout, type ISpec } from '../../shared/chart.ts';
import { COUNTRY_NAMES, WORLD_GEO, countryValues, registerWorldMaps } from '../../shared/world.ts';

const mount: Mount = (el, ctx) => {
  registerWorldMaps();
  const bar = ctx.preview ? null : controlBar(el);
  const spec = {
    type: 'map',
    map: WORLD_GEO,
    nameField: 'name',
    valueField: 'value',
    seriesField: 'name',
    region: [{ roam: true }],
    data: [{ id: 'c', values: countryValues(COUNTRY_NAMES, 3) }],
    area: { style: { stroke: 'rgba(255,255,255,0.3)', lineWidth: 0.5 } },
    legends: { visible: false },
  } as unknown as ISpec;
  const { vchart, container, release } = createChart(el, ctx, spec, { height: 420 });
  const out = bar ? readout(el) : null;
  let alive = true;
  let level = 1;

  // The centre is the point that stays fixed on screen; the middle of the chart keeps the map framed.
  const zoom = (factor: number): void => {
    if (!alive) return;
    const next = level * factor;
    if (next < 0.99 || next > 8) return;
    level = next;
    const centre = { x: container.clientWidth / 2, y: container.clientHeight / 2 };
    // zoom is a ratio applied to the current zoom, so to land on `level` we send the factor itself.
    vchart.geoZoomByIndex(0, factor, centre);
    if (out) out.textContent = `geoZoomByIndex(0, ${factor}, { x: ${Math.round(centre.x)}, y: ${Math.round(centre.y)} })  ->  about ${level.toFixed(2)}x`;
  };
  if (bar) {
    button(bar, 'Zoom in', () => zoom(1.5));
    button(bar, 'Zoom out', () => zoom(1 / 1.5));
    button(bar, 'Zoom 3x at a corner', () => {
      if (!alive) return;
      level = Math.min(8, level * 3);
      vchart.geoZoomByIndex(0, 3, { x: container.clientWidth * 0.25, y: container.clientHeight * 0.35 });
      if (out) out.textContent = 'geoZoomByIndex(0, 3, { x: 25% of width, y: 35% of height })';
    });
    return () => {
      alive = false;
      release();
    };
  }
  let i = 0;
  const stop = every(900, () => zoom([1.4, 1.4, 1.4, 1 / 1.4, 1 / 1.4, 1 / 1.4][i++ % 6] as number));
  return () => {
    alive = false;
    stop();
    release();
  };
};

export default mount;

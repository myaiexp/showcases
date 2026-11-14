// registerMap, getMap and unregisterMap on a hand-made GeoJSON grid
import VChart from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select, type Chart, type ISpec } from '../../shared/chart.ts';

// A name no other example uses: map names are page-wide.
const KEY = 'api-demo-grid-map';

/** An n x n grid of square regions named T1..Tn*n, as GeoJSON. */
function grid(n: number): object {
  const features = Array.from({ length: n * n }, (_, i) => {
    const col = i % n;
    const row = Math.floor(i / n);
    // Longitude and latitude, centred on 0 so the default projection frames the grid.
    const x0 = (col - n / 2) * 10;
    const y0 = (n / 2 - row - 1) * 10;
    return {
      type: 'Feature',
      properties: { name: `T${i + 1}` },
      geometry: { type: 'Polygon', coordinates: // The ring runs clockwise: the geo projection reads the other winding as everything outside the tile.
      [[[x0, y0], [x0, y0 + 9], [x0 + 9, y0 + 9], [x0 + 9, y0], [x0, y0]]] },
    };
  });
  return { type: 'FeatureCollection', features };
}

const spec = (n: number): ISpec =>
  ({
    type: 'map',
    map: KEY,
    nameField: 'name',
    valueField: 'value',
    seriesField: 'name',
    data: [{ id: 'tiles', values: Array.from({ length: n * n }, (_, i) => ({ name: `T${i + 1}`, value: i })) }],
    label: { visible: true, style: { fontSize: 11 } },
    legends: { visible: false },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const out = bar ? readout(el) : null;
  let n = 3;
  let chart: Chart | null = null;
  let alive = true;

  const draw = (size: number): void => {
    if (!alive) return;
    chart?.release();
    chart = null;
    n = size;
    // Replace the registration: unregisterMap first, then registerMap with the new source.
    VChart.unregisterMap(KEY);
    VChart.registerMap(KEY, grid(n) as never, { type: 'geojson' });
    chart = createChart(el, ctx, spec(n), { previewHeight: 200, height: 340 });
    if (out) {
      // getMap returns the registered source as a DataView; its latestData holds the features.
      const view = VChart.getMap(KEY) as unknown as { latestData?: unknown[] };
      out.textContent = `unregisterMap('${KEY}'); registerMap('${KEY}', grid ${n}x${n}); getMap('${KEY}') -> DataView with ${view.latestData?.length ?? '?'} regions`;
    }
  };
  draw(3);
  if (bar) select(bar, 'grid', ['2', '3', '4'], (v) => draw(Number(v))).value = '3';
  let i = 0;
  const stop = bar ? () => {} : every(1800, () => draw([2, 4, 3][i++ % 3] as number));
  return () => {
    alive = false;
    stop();
    chart?.release();
    VChart.unregisterMap(KEY);
  };
};

export default mount;

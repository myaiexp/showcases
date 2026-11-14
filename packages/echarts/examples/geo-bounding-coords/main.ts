// geo.boundingCoords picks which part of the map fills the allocated rect; clip hides the rest
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';

echarts.registerMap('geo-bounding-coords-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

type Corners = [[number, number], [number, number]];
// [lng, lat] of the left-top corner, then of the right-bottom corner.
const PRESETS: Record<string, Corners> = {
  World: [[-180, 90], [180, -90]],
  Europe: [[-12, 72], [42, 34]],
  'East Asia': [[95, 55], [150, 5]],
  'North America': [[-170, 75], [-50, 10]],
  'Southern Africa': [[10, -8], [42, -36]],
};
// The allocated rect, as fractions of the chart: left, top, right, bottom margins.
const FRAME = { x: 0.15, y: 0.1 };

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, container, dispose } = createChart(el, ctx, { height: 480 });
  let preset = 'Europe';
  let clip = true;
  let layout: 'edges' | 'layoutCenter' = 'edges';

  /** Pixel rect of the allocated area, drawn as an outline so the reader sees what clip cuts at. */
  const frame = (): void => {
    const w = chart.getWidth();
    const h = chart.getHeight();
    chart.setOption({
      graphic: {
        type: 'rect',
        silent: true,
        z: 100,
        shape: { x: w * FRAME.x, y: h * FRAME.y, width: w * (1 - 2 * FRAME.x), height: h * (1 - 2 * FRAME.y) },
        style: { fill: 'none', stroke: '#f2b94c', lineWidth: 1, lineDash: [6, 4] },
      },
    });
  };

  const geo = (): object => ({
    map: 'geo-bounding-coords-world',
    // boundingCoords: the map area (in lng/lat) that is fitted into the allocated rect.
    boundingCoords: PRESETS[preset],
    // The allocated rect comes from left/top/right/bottom (stretched to fill) ...
    left: layout === 'edges' ? `${FRAME.x * 100}%` : undefined,
    right: layout === 'edges' ? `${FRAME.x * 100}%` : undefined,
    top: layout === 'edges' ? `${FRAME.y * 100}%` : undefined,
    bottom: layout === 'edges' ? `${FRAME.y * 100}%` : undefined,
    // ... or from layoutCenter + layoutSize, which keep the aspect ratio.
    layoutCenter: layout === 'layoutCenter' ? ['50%', '50%'] : undefined,
    layoutSize: layout === 'layoutCenter' ? '70%' : undefined,
    // clip (6.0): hide whatever falls outside the allocated rect.
    clip,
    itemStyle: { areaColor: '#2a2f3a', borderColor: '#0d1117', borderWidth: 0.5 },
    emphasis: { label: { show: false }, itemStyle: { areaColor: '#4a5265' } },
  });

  chart.setOption({ geo: geo() });
  frame();
  const observer = new ResizeObserver(() => frame());
  observer.observe(container);

  const apply = (): void => {
    chart.setOption({ geo: geo() });
  };
  if (bar) {
    select(bar, 'boundingCoords', Object.keys(PRESETS), (v) => {
      preset = v;
      apply();
    }).value = preset;
    select(bar, 'clip', ['true', 'false'], (v) => {
      clip = v === 'true';
      apply();
    });
    select(bar, 'allocated rect from', ['edges', 'layoutCenter'], (v) => {
      layout = v as typeof layout;
      // Unset keys must be cleared explicitly, so the geo is replaced rather than merged.
      chart.setOption({ geo: geo() }, { replaceMerge: ['geo'] });
    });
  }

  const keys = Object.keys(PRESETS);
  let i = keys.indexOf(preset);
  const stop = ctx.preview
    ? every(2200, () => {
        preset = keys[++i % keys.length]!;
        apply();
      })
    : (): void => {};

  return () => {
    stop();
    observer.disconnect();
    dispose();
  };
};

export default mount;

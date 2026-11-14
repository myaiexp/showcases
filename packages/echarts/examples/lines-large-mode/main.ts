// series.lines large mode: thousands of lines drawn in one batch once the count passes largeThreshold
import type { Mount } from '@/types.ts';
import { controlBar, createChart, echarts, every, select, slider } from '../../shared/chart.ts';
import { COUNTRIES } from '../../shared/world.ts';
import { CITIES, rng } from '../../shared/scatter-data.ts';

echarts.registerMap('lines-large-mode-world', { geoJSON: COUNTRIES as never, specialAreas: {} });

const COLORS = ['#f2b94c', '#5aa3d6', '#6cc28b', '#d47474'];

/** `n` random city-to-city lines with a little jitter, each tagged with its own colour. */
function makeLines(n: number): { coords: [number, number][]; lineStyle: { color: string } }[] {
  const r = rng(11);
  const pick = (): [number, number] => {
    const c = CITIES[Math.floor(r() * CITIES.length)]!;
    return [c.lon + (r() - 0.5) * 8, c.lat + (r() - 0.5) * 6];
  };
  return Array.from({ length: n }, (_, i) => ({ coords: [pick(), pick()], lineStyle: { color: COLORS[i % COLORS.length]! } }));
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const status = document.createElement('span');
  bar?.append(status);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });
  const s = { count: 3000, large: true, threshold: 2000 };
  let data = makeLines(s.count);

  const report = (): void => {
    const active = s.large && s.count >= s.threshold;
    status.textContent = `${s.count} lines, large optimisation ${active ? 'on: per-line colours are ignored' : 'off: per-line colours drawn'}`;
  };

  const lines = (): object => ({
    type: 'lines',
    coordinateSystem: 'geo',
    data,
    // large: batch drawing for big data; it takes effect from largeThreshold lines upward.
    large: s.large,
    largeThreshold: s.threshold,
    // Series-level style, used for every line in large mode.
    lineStyle: { color: '#8fb8ff', width: 0.6, opacity: 0.25, curveness: 0.2 },
    silent: true,
  });

  chart.setOption({
    animation: false,
    geo: {
      map: 'lines-large-mode-world',
      roam: !ctx.preview,
      zoom: ctx.preview ? 1.1 : 1,
      itemStyle: { areaColor: '#232833', borderColor: '#3a4150', borderWidth: 0.5 },
      emphasis: { disabled: true },
      silent: true,
    },
    series: [lines()],
  });
  report();
  const apply = (): void => {
    chart.setOption({ series: [lines()] }, { replaceMerge: ['series'] });
    report();
  };

  if (bar) {
    slider(bar, 'lines', [500, 8000, 500], s.count, (v) => {
      s.count = v;
      data = makeLines(v);
      apply();
    });
    select(bar, 'large', ['true', 'false'], (v) => {
      s.large = v === 'true';
      apply();
    });
    slider(bar, 'largeThreshold', [500, 8000, 500], s.threshold, (v) => {
      s.threshold = v;
      apply();
    });
  }

  let i = 0;
  const stop = ctx.preview
    ? every(2600, () => {
        i++;
        s.large = i % 2 === 0;
        s.count = i % 4 < 2 ? 1500 : 4000;
        data = makeLines(s.count);
        apply();
      })
    : (): void => {};
  if (ctx.preview) {
    s.count = 1500;
    data = makeLines(s.count);
    apply();
  }

  return () => {
    stop();
    dispose();
  };
};

export default mount;

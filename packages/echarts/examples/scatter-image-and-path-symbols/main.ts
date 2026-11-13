// Scatter series using an image data URI symbol and a path:// vector symbol, with symbolKeepAspect on or off
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';

// A small SVG, inlined as a data URI: 'image://' accepts a URL or a dataURI of an image.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="#fac858" stroke="#fff" stroke-width="2"/><circle cx="14" cy="16" r="3" fill="#333"/><circle cx="26" cy="16" r="3" fill="#333"/><path d="M11 25 Q20 34 29 25" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const IMAGE = `image://data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

// 'path://' plus the d attribute of an SVG path: a five-point star in a 0-100 box.
const STAR = 'path://M50 4 L61 38 L97 38 L68 59 L79 94 L50 73 L21 94 L32 59 L3 38 L39 38 Z';

const points = (shift: number): number[][] => Array.from({ length: 8 }, (_, i) => [i + 1, Math.round(5 + 3 * Math.sin(i + shift) + (i % 3))]);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  let size: number | number[] = ctx.preview ? 22 : 30;
  let keep = false;
  let shift = 0;

  const show = (): void => {
    chart.setOption({
      tooltip: {},
      grid: { top: 16, left: 36, right: 16, bottom: 34 },
      xAxis: { type: 'value', min: 0, max: 9 },
      yAxis: { type: 'value', min: 0, max: 14, splitNumber: 4 },
      series: [
        // An image symbol is drawn from the picture itself.
        { name: 'image://', type: 'scatter', symbol: IMAGE, symbolSize: size, data: points(shift) },
        // A path symbol is vector, so it stays sharp at any size. symbolKeepAspect keeps its
        // proportions inside the symbolSize box instead of stretching it.
        { name: 'path://', type: 'scatter', symbol: STAR, symbolSize: size, symbolKeepAspect: keep, itemStyle: { color: '#91cc75' }, data: points(shift + 3).map(([x, y]) => [x!, y! + 5]) },
      ],
    });
  };
  show();

  let stop = (): void => {};
  if (ctx.preview) {
    const sizes: (number | number[])[] = [22, [44, 18], [18, 40]];
    let i = 0;
    stop = every(1800, () => {
      i++;
      size = sizes[i % sizes.length]!;
      keep = i % 2 === 0;
      shift += 0.7;
      show();
    });
  } else {
    const sizes: Record<string, number | number[]> = { '30': 30, '[60, 24] wide': [60, 24], '[24, 60] tall': [24, 60] };
    select(bar!, 'symbolSize', Object.keys(sizes), (v) => {
      size = sizes[v]!;
      show();
    });
    const toggle = button(bar!, 'symbolKeepAspect: off', () => {
      keep = !keep;
      toggle.textContent = `symbolKeepAspect: ${keep ? 'on' : 'off'}`;
      show();
    });
    button(bar!, 'new points', () => {
      shift += 1.3;
      show();
    });
  }
  return () => {
    stop();
    dispose();
  };
};

export default mount;

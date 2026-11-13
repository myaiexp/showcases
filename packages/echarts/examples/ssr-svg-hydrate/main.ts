// Server-side SVG string plus the lightweight SSR client runtime, with no full chart in the page
import type { EChartsOption } from 'echarts';
import { hydrate } from 'echarts/ssr/client/index.js';
import type { Mount } from '@/types.ts';
import { every } from '../../shared/chart.ts';
import { renderOnServer } from './server.ts';

const SERIES = ['Coffee', 'Tea'] as const;
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/** The state the client keeps and sends back on every request, since HTTP is stateless. */
interface ClientState {
  shown: Record<string, boolean>;
  round: number;
}

const optionFor = ({ shown, round }: ClientState, preview: boolean): EChartsOption => ({
  backgroundColor: 'transparent',
  legend: { show: !preview, top: 6, selected: shown },
  grid: preview ? { top: 14, bottom: 22, left: 34, right: 10 } : { top: 40 },
  xAxis: { type: 'category', data: days },
  yAxis: { type: 'value' },
  series: SERIES.map((name, s) => ({
    name,
    type: 'bar' as const,
    data: days.map((_, d) => 20 + Math.round(30 * Math.abs(Math.sin(d + s * 2 + round)))),
  })),
});

const mount: Mount = (el, ctx) => {
  const width = ctx.preview ? 260 : 640;
  const height = ctx.preview ? 200 : 360;
  const box = document.createElement('div');
  box.style.width = `${width}px`;
  box.style.maxWidth = '100%';
  const info = document.createElement('p');
  info.style.fontSize = '13px';
  el.append(box);
  if (!ctx.preview) el.append(info);

  const state: ClientState = { shown: { Coffee: true, Tea: true }, round: 0 };

  // "Request" a fresh render and show the returned string. The SVG carries its own CSS
  // entry animation and hover styles, so no ECharts code runs for those in the page.
  const update = (): void => {
    const svg = renderOnServer(optionFor(state, ctx.preview), width, height);
    const doc = new DOMParser().parseFromString(svg, 'image/svg+xml');
    box.replaceChildren(document.importNode(doc.documentElement, true));
    info.textContent = `Server returned ${(svg.length / 1024).toFixed(1)} KB of SVG. Click a legend item to toggle its series; the client sends its state back and gets a new SVG.`;

    // The lightweight runtime (echarts/ssr/client, a few KB) reads the ecmeta_* attributes
    // in the SVG and reports clicks on legend items and chart items.
    hydrate(box, {
      on: {
        click: (params) => {
          if (params.ssrType !== 'legend' || params.seriesIndex == null) return;
          const name = SERIES[params.seriesIndex]!;
          state.shown[name] = !state.shown[name];
          update();
        },
      },
    });
  };
  update();

  // New data on a timer: each round is a whole new server render.
  const stop = every(ctx.preview ? 2400 : 4000, () => {
    state.round++;
    update();
  });

  return () => {
    stop();
    box.remove();
    info.remove();
  };
};

export default mount;

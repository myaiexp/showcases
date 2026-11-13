// Empty axes with a loading spinner, async data fill-in by series name, then live updates
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every } from '../../shared/chart.ts';

/** Stands in for `$.get('data.json')`: resolves after a delay, or rejects on abort. */
function fakeRequest<T>(value: () => T, ms: number, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const id = window.setTimeout(() => resolve(value()), ms);
    signal.addEventListener('abort', () => {
      window.clearTimeout(id);
      reject(signal.reason);
    });
  });
}

const fmt = (d: Date): string => d.toTimeString().slice(0, 8);

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  const local = new AbortController();
  const signal = AbortSignal.any([ctx.signal, local.signal]);

  // Step 1: everything but the data, so the user sees titled, empty axes at once.
  chart.setOption({
    title: ctx.preview ? undefined : { text: 'Requests per second' },
    tooltip: { trigger: 'axis' },
    grid: ctx.preview ? { top: 14, bottom: 22, left: 36, right: 10 } : undefined,
    xAxis: { type: 'category', boundaryGap: false, data: [] },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [{ name: 'Requests', type: 'line', smooth: true, areaStyle: { opacity: 0.25 }, showSymbol: false, data: [] }],
  });

  let times: string[] = [];
  let values: number[] = [];
  let stopLive = (): void => {};
  const next = (prev: number): number => Math.max(5, Math.min(95, prev + (Math.random() - 0.5) * 20));

  const load = async (): Promise<void> => {
    stopLive();
    // Step 2: the built-in loading animation while the request is out. Its default mask
    // is translucent white, so the opts give it the page's dark colours instead.
    chart.showLoading('default', { maskColor: 'rgba(12, 14, 20, 0.75)', textColor: '#d7dde8', color: '#5b8ff9' });
    const now = Date.now();
    const history = await fakeRequest(
      () => Array.from({ length: 30 }, (_, i) => ({ t: fmt(new Date(now - (30 - i) * 1000)), v: 40 + 20 * Math.sin(i / 4) })),
      ctx.preview ? 800 : 1500,
      signal,
    );
    chart.hideLoading();
    times = history.map((p) => p.t);
    values = history.map((p) => Math.round(p.v));
    // Step 3: fill in only the data, finding the series by its name.
    chart.setOption({ xAxis: { data: times }, series: [{ name: 'Requests', data: values }] });

    // Dynamic update: push a point, drop the oldest, setOption again; ECharts diffs and
    // slides the line along.
    stopLive = every(1000, () => {
      times = [...times.slice(1), fmt(new Date())];
      values = [...values.slice(1), Math.round(next(values.at(-1) ?? 50))];
      chart.setOption({ xAxis: { data: times }, series: [{ name: 'Requests', data: values }] });
    });
  };

  const run = (): void => {
    load().catch(() => {
      // Aborted on unmount: nothing left to show.
    });
  };
  run();
  if (bar) button(bar, 'Reload', run);

  return () => {
    local.abort();
    stopLive();
    dispose();
  };
};

export default mount;

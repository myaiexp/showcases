// showLoading with each documented option, plus a fake data load that hides the overlay
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { createChart, controlBar, select, slider, button } from '../../shared/chart.ts';

const cats = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const rand = (): number[] => cats.map(() => Math.round(20 + Math.random() * 60));
const dataOption = (): EChartsOption => ({
  grid: { top: 16, left: 40, right: 16, bottom: 28 },
  xAxis: { type: 'category', data: cats },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: rand() }],
});

interface Loading { text: string; color: string; textColor: string; maskColor: string; fontSize: number; showSpinner: boolean; spinnerRadius: number; lineWidth: number }

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx);
  chart.setOption(dataOption());

  const look: Loading = {
    text: 'loading', color: '#fac858', textColor: '#ffffff', maskColor: 'rgba(20, 20, 30, 0.8)',
    fontSize: 14, showSpinner: true, spinnerRadius: 10, lineWidth: 5,
  };
  // type 'default' is the only one; the second argument holds the options listed in the docs.
  const show = (): void => chart.showLoading('default', { ...look });

  const timers = new Set<number>();
  const later = (ms: number, fn: () => void): void => {
    const id = window.setTimeout(() => {
      timers.delete(id);
      fn();
    }, ms);
    timers.add(id);
  };
  // A fake request: overlay on, data arrives, overlay off.
  const load = (): void => {
    show();
    later(1600, () => {
      chart.setOption(dataOption());
      chart.hideLoading();
    });
  };

  let stop = (): void => {};
  if (ctx.preview) {
    const looks: Partial<Loading>[] = [
      {},
      { text: 'fetching', color: '#91cc75', spinnerRadius: 16, lineWidth: 3 },
      { text: '', showSpinner: true, color: '#ee6666', spinnerRadius: 7, lineWidth: 8 },
    ];
    let i = 0;
    const cycle = (): void => {
      Object.assign(look, { text: 'loading', color: '#fac858', spinnerRadius: 10, lineWidth: 5 }, looks[i % 3]);
      i += 1;
      load();
    };
    cycle();
    const id = window.setInterval(cycle, 2800);
    stop = () => window.clearInterval(id);
  } else {
    // Changing a value while the overlay is up re-calls showLoading with the new options.
    const redo = (): void => show();
    const text = document.createElement('input');
    text.value = look.text;
    text.addEventListener('input', () => { look.text = text.value; redo(); });
    const wrap = document.createElement('label');
    wrap.append('text ', text);
    bar!.append(wrap);
    select(bar!, 'color', ['#fac858', '#5470c6', '#91cc75', '#ee6666'], (v) => { look.color = v; redo(); });
    select(bar!, 'textColor', ['#ffffff', '#fac858', '#000000'], (v) => { look.textColor = v; redo(); });
    select(bar!, 'maskColor', ['rgba(20, 20, 30, 0.8)', 'rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.3)'], (v) => { look.maskColor = v; redo(); });
    slider(bar!, 'fontSize', [10, 28, 1], look.fontSize, (v) => { look.fontSize = v; redo(); });
    slider(bar!, 'spinnerRadius', [4, 30, 1], look.spinnerRadius, (v) => { look.spinnerRadius = v; redo(); });
    slider(bar!, 'lineWidth', [1, 12, 1], look.lineWidth, (v) => { look.lineWidth = v; redo(); });
    select(bar!, 'showSpinner', ['true', 'false'], (v) => { look.showSpinner = v === 'true'; redo(); });
    button(bar!, 'showLoading', show);
    button(bar!, 'hideLoading', () => chart.hideLoading());
    button(bar!, 'fake load (1.6 s)', load);
    show();
  }

  return () => {
    stop();
    for (const id of timers) window.clearTimeout(id);
    dispose();
  };
};

export default mount;

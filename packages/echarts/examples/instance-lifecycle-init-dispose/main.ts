// One container taken through init, setOption, clear and dispose, with the instance state read back
import type { Mount } from '@/types.ts';
import { THEME, button, controlBar, echarts, every } from '../../shared/chart.ts';

const option = {
  grid: { top: 24, left: 36, right: 16, bottom: 28 },
  xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] },
  yAxis: {},
  series: [{ type: 'bar', data: [14, 28, 19, 33, 22] }],
} as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const container = document.createElement('div');
  container.style.cssText = `width:100%;height:${ctx.preview ? 170 : 300}px`;
  const status = document.createElement('div');
  status.style.cssText = 'font:12px/1.5 monospace;opacity:.85;min-height:30px';
  el.append(container, status);

  let chart: echarts.ECharts | null = null;
  const report = (note: string): void => {
    // getInstanceByDom returns the live instance bound to a DOM node, or undefined after dispose.
    const found = echarts.getInstanceByDom(container);
    status.textContent = `${note} | getInstanceByDom: ${found ? 'instance' : 'undefined'} | isDisposed: ${chart ? chart.isDisposed() : 'no instance yet'}`;
  };

  const init = (): void => {
    // A container must not be initialised twice; the guard avoids ECharts' warning.
    if (echarts.getInstanceByDom(container)) return;
    chart = echarts.init(container, THEME);
    report('init');
  };
  const set = (): void => {
    if (!chart || chart.isDisposed()) return;
    chart.setOption({ ...option, series: [{ type: 'bar', data: option.series[0].data.map((v) => Math.round(v * (0.6 + Math.random() * 0.8))) }] });
    report('setOption');
  };
  const clear = (): void => {
    if (!chart || chart.isDisposed()) return;
    chart.clear();
    report('clear');
  };
  const dispose = (): void => {
    if (!chart || chart.isDisposed()) return;
    chart.dispose();
    report('dispose');
  };

  init();
  set();

  let stop = (): void => {};
  if (ctx.preview) {
    const steps = [set, clear, dispose, () => { init(); set(); }];
    let i = 0;
    stop = every(1400, () => steps[i++ % steps.length]!());
  } else {
    button(bar!, 'init', init);
    button(bar!, 'setOption', set);
    button(bar!, 'clear', clear);
    button(bar!, 'dispose', dispose);
  }

  return () => {
    stop();
    if (chart && !chart.isDisposed()) chart.dispose();
    container.remove();
    status.remove();
  };
};

export default mount;

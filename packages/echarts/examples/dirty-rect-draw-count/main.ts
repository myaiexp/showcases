// A 2500-point canvas scatter highlighted point by point; init's useDirtyRect decides how much each repaint redraws
import type { Mount } from '@/types.ts';
import { THEME, button, controlBar, echarts, every, select } from '../../shared/chart.ts';

const N = 2500;
// Deterministic points so the two modes draw exactly the same picture.
const points: [number, number][] = Array.from({ length: N }, (_, i) => {
  const a = i * 2.399963;
  const r = Math.sqrt(i / N);
  return [Math.round((Math.cos(a) * r * 50 + 50) * 100) / 100, Math.round((Math.sin(a) * r * 50 + 50) * 100) / 100];
});

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const box = document.createElement('div');
  box.style.cssText = `width:100%;height:${ctx.preview ? 168 : 380}px`;
  const readout = document.createElement('div');
  readout.style.cssText = 'font:12px/1.6 monospace;opacity:.9;padding-top:4px';
  el.append(box, readout);

  let chart: echarts.ECharts | null = null;
  let dirty = true;
  let calls = 0;
  let last = 0;
  let current = 0;
  let restore: (() => void) | null = null;

  const create = (): void => {
    restore?.();
    chart?.dispose();
    // useDirtyRect (canvas renderer only) redraws just the area that changed in a frame.
    chart = echarts.init(box, THEME, { renderer: 'canvas', useDirtyRect: dirty });
    chart.setOption({
      animation: false,
      grid: { top: 8, left: 8, right: 8, bottom: 8 },
      xAxis: { type: 'value', show: false, min: 0, max: 100 },
      yAxis: { type: 'value', show: false, min: 0, max: 100 },
      series: [{ type: 'scatter', data: points, symbolSize: 7, itemStyle: { opacity: 0.75 }, emphasis: { scale: 2.2 } }],
    });
    // The counter wraps fill and stroke on this chart's own 2D context.
    const g = box.querySelector('canvas')?.getContext('2d');
    if (g) {
      const fill = g.fill.bind(g) as typeof g.fill;
      const stroke = g.stroke.bind(g) as typeof g.stroke;
      g.fill = ((...a: never[]) => { calls++; return (fill as (...x: unknown[]) => void)(...a); }) as typeof g.fill;
      g.stroke = ((...a: never[]) => { calls++; return (stroke as (...x: unknown[]) => void)(...a); }) as typeof g.stroke;
      restore = (): void => {
        delete (g as Partial<typeof g>).fill;
        delete (g as Partial<typeof g>).stroke;
      };
    }
    // 'rendered' fires after each painted frame: bank the count for that frame.
    chart.on('rendered', () => {
      if (calls > 0) last = calls;
      calls = 0;
      readout.textContent = `useDirtyRect: ${dirty ? 'on' : 'off'} | draw calls in the last repaint: ${last}`;
    });
    calls = 0;
  };
  create();

  const highlightNext = (): void => {
    if (!chart) return;
    chart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: current });
    current = Math.floor(Math.random() * N);
    chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: current });
  };

  const ro = new ResizeObserver(() => {
    if (box.clientWidth > 0 && box.clientHeight > 0) chart?.resize();
  });
  ro.observe(box);

  let stop: () => void;
  if (ctx.preview) {
    let n = 0;
    stop = every(500, () => {
      if (++n % 8 === 0) {
        dirty = !dirty;
        create();
      }
      highlightNext();
    });
  } else {
    select(bar!, 'useDirtyRect', ['on', 'off'], (v) => {
      dirty = v === 'on';
      create();
    });
    button(bar!, 'highlight a random point', highlightNext);
    stop = every(1200, highlightNext);
  }

  return () => {
    stop();
    ro.disconnect();
    restore?.();
    chart?.dispose();
    box.remove();
    readout.remove();
  };
};

export default mount;

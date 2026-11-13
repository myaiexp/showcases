// Re-creates a chart with different echarts.init opts (width, height, devicePixelRatio, renderer) and reads the result back
import type { Mount } from '@/types.ts';
import { THEME, controlBar, echarts, every, select } from '../../shared/chart.ts';

interface Opts { width: string; height: string; dpr: string; renderer: 'canvas' | 'svg' }

const toSize = (v: string): number | 'auto' => (v === 'auto' ? 'auto' : Number(v));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  // The container keeps a fixed CSS size and a visible border; the chart inside it may be
  // smaller when opts.width / opts.height are explicit numbers.
  const box = document.createElement('div');
  box.style.cssText = `width:100%;height:${ctx.preview ? 200 : 320}px;border:1px dashed rgba(150,150,150,.6);box-sizing:border-box;overflow:hidden`;
  const readout = document.createElement('pre');
  readout.style.cssText = 'margin:8px 0 0;font-size:12px;opacity:.85';
  el.append(box);
  if (!ctx.preview) el.append(readout);

  const opts: Opts = { width: 'auto', height: 'auto', dpr: 'default', renderer: 'canvas' };
  let chart: echarts.ECharts | null = null;

  const create = (): void => {
    chart?.dispose();
    // 'auto' (or null) means: use the container's own size. devicePixelRatio is omitted to
    // use window.devicePixelRatio, the documented default.
    chart = echarts.init(box, THEME, {
      renderer: opts.renderer,
      width: toSize(opts.width),
      height: toSize(opts.height),
      ...(opts.dpr === 'default' ? {} : { devicePixelRatio: Number(opts.dpr) }),
    });
    chart.setOption({
      title: { text: 'init opts', textStyle: { fontSize: 14 } },
      grid: { top: 40, left: 36, right: 16, bottom: 30 },
      xAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'] },
      yAxis: {},
      series: [{ type: 'bar', data: [12, 25, 18, 30, 9], label: { show: true } }],
      animation: false,
    });
    const canvas = box.querySelector('canvas');
    readout.textContent = [
      `getWidth() x getHeight(): ${chart.getWidth()} x ${chart.getHeight()} CSS px`,
      `renderer: ${opts.renderer}`,
      canvas ? `canvas backing store: ${canvas.width} x ${canvas.height} px` : 'svg: vector, no backing store',
    ].join('\n');
  };
  create();

  // With 'auto' sizes the chart follows the container, so it needs resize() on container changes.
  const ro = new ResizeObserver(() => {
    if (box.clientWidth > 0 && box.clientHeight > 0) chart?.resize();
  });
  ro.observe(box);

  let stop = (): void => {};
  if (ctx.preview) {
    const steps: Partial<Opts>[] = [
      { width: 'auto', height: 'auto' },
      { width: '160', height: '120' },
      { width: '220', height: 'auto' },
    ];
    let i = 0;
    stop = every(1600, () => {
      Object.assign(opts, steps[++i % steps.length]);
      create();
    });
  } else {
    const apply = (patch: Partial<Opts>): void => {
      Object.assign(opts, patch);
      create();
    };
    select(bar!, 'width', ['auto', '240', '400', '600'], (v) => apply({ width: v }));
    select(bar!, 'height', ['auto', '160', '240'], (v) => apply({ height: v }));
    select(bar!, 'devicePixelRatio', ['default', '1', '2', '3'], (v) => apply({ dpr: v }));
    select(bar!, 'renderer', ['canvas', 'svg'], (v) => apply({ renderer: v as Opts['renderer'] }));
  }

  return () => {
    stop();
    ro.disconnect();
    chart?.dispose();
    box.remove();
    readout.remove();
  };
};

export default mount;

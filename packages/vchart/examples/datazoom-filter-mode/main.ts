// DataZoom filterMode: 'filter' rescales the value axis to the window, 'axis' keeps the full range
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, readout, every } from '../../shared/chart.ts';
import { slideWindow, walk } from '../../shared/components-data.ts';

// A rising trend, so the window's maximum differs a lot from the whole data's.
const data = walk(40, 9).map((d, i) => ({ ...d, y: Math.round(d.y * (0.3 + i / 14)) }));

const build = (filterMode: 'filter' | 'axis'): ISpec => ({
  type: 'bar',
  data: [{ id: 'bars', values: data }],
  xField: 'x',
  yField: 'y',
  bar: { style: { fill: '#38bdf8' } },
  axes: [{ orient: 'left' }, { orient: 'bottom', label: { autoHide: true } }],
  dataZoom: [{ orient: 'bottom', filterMode, start: 0, end: 0.3, showBackgroundChart: true }],
});

const mount: Mount = (el, ctx) => {
  const { vchart, release } = createChart(el, ctx, build('filter'));
  let released = false;

  let stopSlide = (): void => {};
  let stopFlip = (): void => {};
  let out: HTMLPreElement | undefined;
  if (ctx.preview) {
    stopSlide = slideWindow(vchart, 'dataZoom', 0.3, 80);
    let axis = false;
    stopFlip = every(6000, () => {
      axis = !axis;
      if (!released) void vchart.updateSpec(build(axis ? 'axis' : 'filter'));
    });
  } else {
    const bar = controlBar(el);
    select(bar, 'filterMode', ['filter', 'axis'], (v) => {
      if (!released) void vchart.updateSpec(build(v as 'filter' | 'axis'));
    });
    el.prepend(bar);
    out = readout(el);
    out.textContent = 'Drag the slider handles or the selection.';
    vchart.on('dataZoomChange', (e) => {
      const v = (e as { value?: { start: number; end: number; startValue: string; endValue: string } }).value;
      if (out && v) out.textContent = `dataZoomChange: ${v.startValue} to ${v.endValue} (start ${v.start.toFixed(2)}, end ${v.end.toFixed(2)})`;
    });
  }

  return () => {
    stopSlide();
    stopFlip();
    released = true;
    release();
  };
};

export default mount;

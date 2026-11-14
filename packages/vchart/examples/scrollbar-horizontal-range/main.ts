// ScrollBar on a category axis: startValue / endValue as the initial window, roamDrag / roamZoom / roamScroll and scrollBarChange
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, controlBar, select, slider, readout } from '../../shared/chart.ts';
import { rng, slideWindow } from '../../shared/components-data.ts';

const MONTHS = Array.from({ length: 36 }, (_, i) => `${2021 + Math.floor(i / 12)}-${String((i % 12) + 1).padStart(2, '0')}`);
const data = (() => {
  const r = rng(77);
  return MONTHS.map((month) => ({ month, sales: Math.round(20 + r() * 80) }));
})();

const build = (first: number, count: number, roam: string): ISpec => ({
  type: 'bar',
  data: [{ id: 'sales', values: data }],
  xField: 'month',
  yField: 'sales',
  bar: { style: { fill: '#34d399' } },
  axes: [{ orient: 'left' }, { orient: 'bottom', label: { autoHide: true } }],
  scrollBar: [
    {
      orient: 'bottom',
      // The visible window, as category values; start / end would give it as 0-1 ratios.
      startValue: MONTHS[first],
      endValue: MONTHS[Math.min(first + count - 1, MONTHS.length - 1)],
      // roamDrag / roamZoom / roamScroll make the chart body itself move the window
      roamDrag: roam === 'drag',
      roamZoom: roam === 'zoom',
      roamScroll: roam === 'scroll',
    },
  ],
});

const mount: Mount = (el, ctx) => {
  let first = 6;
  let count = 8;
  let roam = 'off';
  const { vchart, release } = createChart(el, ctx, build(first, count, roam));
  let released = false;

  let stop = (): void => {};
  let out: HTMLPreElement | undefined;
  if (ctx.preview) {
    stop = slideWindow(vchart, 'scrollBar', 0.25, 90);
  } else {
    const apply = (): void => {
      if (!released) void vchart.updateSpec(build(first, count, roam));
    };
    const bar = controlBar(el);
    slider(bar, 'first month', [0, 28, 1], first, (v) => ((first = v), apply()));
    slider(bar, 'visible months', [3, 24, 1], count, (v) => ((count = v), apply()));
    select(bar, 'roam', ['off', 'drag', 'zoom', 'scroll'], (v) => ((roam = v), apply()));
    el.prepend(bar);
    out = readout(el);
    out.textContent = 'Drag the scrollbar.';
    vchart.on('scrollBarChange', (e) => {
      const v = (e as { value?: { startValue: string; endValue: string } }).value;
      if (out && v) out.textContent = `scrollBarChange: ${v.startValue} to ${v.endValue}`;
    });
  }

  return () => {
    stop();
    released = true;
    release();
  };
};

export default mount;

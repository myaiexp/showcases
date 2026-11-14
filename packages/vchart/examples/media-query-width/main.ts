// Width breakpoints with maxWidth: labels and axes change
import { registerMediaQuery } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, readout, slider } from '../../shared/chart.ts';
import { monthRows, setSize, shrinkLoop } from '../../shared/adapt-data.ts';

const mount: Mount = (el, ctx) => {
  registerMediaQuery();

  const bar = ctx.preview ? null : controlBar(el);
  const wide = Math.max(el.clientWidth || 600, 300);
  const narrow = ctx.preview ? Math.round(wide * 0.5) : 300;
  const medium = ctx.preview ? Math.round(wide * 0.75) : Math.round(wide * 0.65);
  const { container, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'sales', values: monthRows }],
    xField: 'month',
    yField: 'sales',
    label: { visible: false },
    axes: [
      { orient: 'bottom', type: 'band', label: { visible: true } },
      { orient: 'left', type: 'linear' },
    ],
    // Two overlapping queries: maxWidth `medium` shows value labels, maxWidth `narrow` also drops the axes' labels.
    media: [
      { query: { maxWidth: medium }, action: [{ filterType: 'label', spec: { visible: true } }] },
      {
        query: { maxWidth: narrow + 20 },
        action: [
          { filterType: 'cartesianAxis-band', spec: { label: { visible: false } } },
          { filterType: 'chart', spec: { padding: 6 } },
        ],
      },
    ],
  } as never);
  // The queries are measured against the chart, so start from an explicit width in pixels.
  setSize(container, 'width', wide);
  const out = bar ? readout(el) : null;
  const show = (w: number): void => {
    if (out) out.textContent = `width ${w}px: value labels ${w <= medium ? 'on' : 'off'} (maxWidth ${medium}), month labels ${w <= narrow + 20 ? 'hidden' : 'shown'} (maxWidth ${narrow + 20})`;
  };
  show(wide);

  let stop = (): void => {};
  if (ctx.preview) stop = shrinkLoop(container, 'width', wide, narrow, 2400);
  else if (bar) {
    slider(bar, 'width px', [220, wide, 10], wide, (w) => {
      setSize(container, 'width', w);
      show(w);
    });
  }

  return () => {
    stop();
    release();
  };
};

export default mount;

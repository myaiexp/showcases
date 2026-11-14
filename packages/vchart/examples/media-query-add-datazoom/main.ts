// Media action with forceAppend adds a dataZoom on a narrow chart
import { registerMediaQuery } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, readout, slider } from '../../shared/chart.ts';
import { monthRows, setSize, shrinkLoop } from '../../shared/adapt-data.ts';

const mount: Mount = (el, ctx) => {
  registerMediaQuery();

  const bar = ctx.preview ? null : controlBar(el);
  const wide = Math.max(el.clientWidth || 600, 300);
  const narrow = Math.round(wide * 0.45);
  const limit = Math.round(wide * 0.7);
  const { container, release } = createChart(el, ctx, {
    type: 'bar',
    data: [{ id: 'sales', values: monthRows }],
    xField: 'month',
    yField: 'sales',
    media: [
      {
        query: { maxWidth: limit },
        action: [
          {
            // No dataZoom exists in the spec, so forceAppend adds this one as a new component.
            filterType: 'dataZoom',
            forceAppend: true,
            spec: { orient: 'bottom', start: 0, end: 0.5, height: 20 },
          },
        ],
      },
    ],
  } as never);
  setSize(container, 'width', wide);
  const out = bar ? readout(el) : null;
  const show = (w: number): void => {
    if (out) out.textContent = `width ${w}px: ${w <= limit ? 'narrow, the query appended a dataZoom (drag its handles)' : 'wide, no dataZoom'} (maxWidth ${limit})`;
  };
  show(wide);

  let stop = (): void => {};
  if (ctx.preview) stop = shrinkLoop(container, 'width', wide, narrow, 2600);
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

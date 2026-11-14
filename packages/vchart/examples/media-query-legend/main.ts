// Media query on chart height: legend left, no title, less padding
import { registerMediaQuery } from '@visactor/vchart';
import type { Mount } from '@/types.ts';
import { controlBar, createChart, readout, slider } from '../../shared/chart.ts';
import { ELEMENT_ROWS, setSize, shrinkLoop } from '../../shared/adapt-data.ts';

const mount: Mount = (el, ctx) => {
  // The media query ships as a plugin; register it once before the chart is made.
  registerMediaQuery();

  const BIG = ctx.preview ? 200 : 380;
  const SMALL = ctx.preview ? 110 : 180;
  const threshold = ctx.preview ? 150 : 200;
  const bar = ctx.preview ? null : controlBar(el);
  const { container, release } = createChart(
    el,
    ctx,
    {
      type: 'pie',
      data: [{ id: 'elements', values: ELEMENT_ROWS }],
      valueField: 'value',
      categoryField: 'type',
      outerRadius: 0.8,
      innerRadius: 0.5,
      padAngle: 0.6,
      title: { visible: true, text: 'Surface element content' },
      legends: { visible: true, orient: 'bottom', padding: 8 },
      media: [
        {
          query: { maxHeight: threshold },
          action: [
            { filterType: 'legends', filter: [{ orient: 'top' }, { orient: 'bottom' }], spec: { orient: 'left', padding: 0 } },
            { filterType: 'title', spec: { visible: false } },
            { filterType: 'chart', spec: { padding: 10 } },
          ],
        },
      ],
    } as never,
    { previewHeight: BIG },
  );
  const out = bar ? readout(el) : null;
  const show = (h: number): void => {
    if (out) out.textContent = `container height ${h}px: query maxHeight ${threshold} is ${h <= threshold ? 'ACTIVE (legend left, no title)' : 'inactive'}`;
  };
  show(BIG);

  let stop = (): void => {};
  if (ctx.preview) stop = shrinkLoop(container, 'height', BIG, SMALL, 2400);
  else if (bar) {
    slider(bar, 'height px', [120, 380, 10], BIG, (h) => {
      setSize(container, 'height', h);
      show(h);
    });
  }

  return () => {
    stop();
    release();
  };
};

export default mount;

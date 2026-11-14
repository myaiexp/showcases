// The base pointer and mouse events on bars, counted per event name
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { clickDatum, salesRows } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

const NAMES = ['pointerdown', 'pointerup', 'pointertap', 'mousedown', 'mouseup', 'click', 'dblclick', 'pointerover', 'pointermove', 'pointerenter', 'mouseover'];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'sales', values: salesRows }], xField: 'day', yField: 'sales', seriesField: 'team', legends: { visible: false } } as never,
    { previewHeight: 100 },
  );
  const out = readout(el);
  const counts = new Map<string, number>(NAMES.map((n) => [n, 0]));
  const show = (): void => {
    out.textContent = NAMES.map((n) => `${n}: ${counts.get(n)}`).join('   ') + (ctx.preview ? '' : '\n(fired from code: down, up, tap, click; the hover family and dblclick come from a real pointer)');
  };
  const handlers = NAMES.map((name) => {
    const h = (): void => {
      counts.set(name, (counts.get(name) ?? 0) + 1);
      show();
    };
    // Scoped to bar marks, so axis or background events do not count.
    vchart.on(name as 'click', { level: 'mark', type: 'bar' } as never, h);
    return [name, h] as const;
  });
  show();

  let released = false;
  let n = 0;
  const clickBar = (): void => {
    if (!released) clickDatum(vchart, container, pick(salesRows, n++ * 3 + 1));
  };

  let stop = (): void => {};
  if (ctx.preview) stop = every(1300, clickBar);
  else if (bar) {
    button(bar, 'Click a bar from code', clickBar);
  }

  return () => {
    released = true;
    stop();
    for (const [name, h] of handlers) vchart.off(name as 'click', h);
    release();
  };
};

export default mount;

// The throttle and debounce query options on a click burst
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';
import { clickDatum, salesRows } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'sales', values: salesRows }], xField: 'day', yField: 'sales', seriesField: 'team', legends: { visible: false } } as never,
    { previewHeight: 120 },
  );
  const out = readout(el);
  const counts = { plain: 0, 'throttle 300': 0, 'debounce 300': 0 };
  const show = (): void => {
    out.textContent = Object.entries(counts).map(([k, n]) => `${k.padEnd(13)} ${n}`).join('\n');
  };
  const hit = (k: keyof typeof counts) => (): void => {
    counts[k] += 1;
    show();
  };
  const plain = hit('plain');
  const throttled = hit('throttle 300');
  const debounced = hit('debounce 300');
  vchart.on('click', plain);
  vchart.on('click', { throttle: 300 } as never, throttled);
  vchart.on('click', { debounce: 300 } as never, debounced);
  show();

  let released = false;
  const timers: number[] = [];
  let n = 0;
  // Ten clicks, 60 ms apart: a plain listener sees ten, throttle lets one or a few through, debounce reports once after the burst.
  const burst = (): void => {
    for (let i = 0; i < 10; i++) {
      timers.push(
        window.setTimeout(() => {
          if (!released) clickDatum(vchart, container, pick(salesRows, n++ * 3 + 1));
        }, i * 60),
      );
    }
  };

  let stop = (): void => {};
  if (ctx.preview) stop = every(2200, burst);
  else if (bar) button(bar, 'Fire a burst of 10 clicks', burst);

  return () => {
    released = true;
    stop();
    timers.forEach((t) => window.clearTimeout(t));
    vchart.off('click', plain);
    vchart.off('click', throttled);
    vchart.off('click', debounced);
    release();
  };
};

export default mount;

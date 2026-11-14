// Click bubbling mark to vchart, and consume: true stopping it
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { clickDatum, eventLog, salesRows } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

const LEVELS = ['mark', 'model', 'chart', 'vchart'] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'sales', values: salesRows }], xField: 'day', yField: 'sales', seriesField: 'team', legends: { visible: false } } as never,
    { previewHeight: 105 },
  );
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 5 : 10, false);

  // One click listener per level. The 'mark' one can swallow the event with consume.
  let consumeAt: string = 'nobody';
  const handlers: Partial<Record<(typeof LEVELS)[number], () => void>> = {};
  const attach = (): void => {
    for (const level of LEVELS) {
      const old = handlers[level];
      if (old) vchart.off('click', old);
      const h = (): void => log(`click reached level: ${level}`);
      handlers[level] = h;
      vchart.on('click', { level, consume: consumeAt === level } as never, h);
    }
  };
  attach();

  let released = false;
  let n = 0;
  const click = (): void => {
    if (released) return;
    log('--- click ---');
    clickDatum(vchart, container, pick(salesRows, n++ * 3 + 1));
  };

  let stop = (): void => {};
  if (ctx.preview) {
    let i = 0;
    stop = every(1300, () => {
      i += 1;
      if (i % 3 === 1) {
        consumeAt = pick(['nobody', 'mark', 'model'], Math.floor(i / 3));
        attach();
        log(`consume at: ${consumeAt}`);
      }
      click();
    });
  } else if (bar) {
    select(bar, 'consume: true on level', ['nobody', ...LEVELS], (v) => {
      consumeAt = v;
      attach();
      log(`consume at: ${v}`);
    });
    const b = document.createElement('button');
    b.textContent = 'Click a bar from code';
    b.addEventListener('click', click);
    bar.append(b);
  }

  return () => {
    released = true;
    stop();
    for (const level of LEVELS) {
      const h = handlers[level];
      if (h) vchart.off('click', h);
    }
    release();
  };
};

export default mount;

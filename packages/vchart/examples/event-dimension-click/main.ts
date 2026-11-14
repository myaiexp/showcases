// dimensionClick and dimensionHover carry every datum on a dimension
import type { Mount } from '@/types.ts';
import { createChart, every, readout } from '../../shared/chart.ts';
import { clickAt, eventLog, salesRows, DAYS } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

interface DimEvent {
  dimensionInfo?: { value?: string | number; data?: { datum?: { team?: string; sales?: number }[] }[] }[];
}

const mount: Mount = (el, ctx) => {
  const { vchart, container, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'sales', values: salesRows }], xField: 'day', yField: 'sales', seriesField: 'team', legends: { visible: !ctx.preview } } as never,
    { previewHeight: 130 },
  );
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 3 : 8);
  if (!ctx.preview) log('Hover or click a day: the event carries the whole dimension.');

  const describe = (name: string, e: DimEvent): void => {
    const info = e.dimensionInfo?.[0];
    const rows = (info?.data ?? []).flatMap((d) => d.datum ?? []);
    log(`${name}: ${info?.value ?? '-'} -> ${rows.map((r) => `${r.team} ${r.sales}`).join(', ')}`);
  };
  vchart.on('dimensionHover', (e) => describe('dimensionHover', e as DimEvent));
  vchart.on('dimensionClick', (e) => describe('dimensionClick', e as DimEvent));

  let released = false;
  let n = 0;
  const clickDay = (): void => {
    if (released) return;
    const day = pick(DAYS, n++);
    const p = vchart.convertValueToPosition(day, { axisId: undefined, axisIndex: 0 } as never, true);
    const rect = container.getBoundingClientRect();
    clickAt(container, typeof p === 'number' ? p : rect.width / 2, 40);
  };

  let stop = (): void => {};
  if (ctx.preview) stop = every(1000, clickDay);
  else {
    const b = document.createElement('button');
    b.textContent = 'Click the next day from code';
    b.addEventListener('click', clickDay);
    el.prepend(b);
  }

  return () => {
    released = true;
    stop();
    release();
  };
};

export default mount;

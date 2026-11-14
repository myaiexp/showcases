// vchart.on with level, type, markName and filter queries
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { clickDatum, eventLog, salesRows } from '../../shared/events-data.ts';
import { pick } from '../../shared/components-data.ts';

const QUERIES = ['no query (every click)', "{ level: 'mark', type: 'bar' }", "{ markName: 'bar' }", "{ filter: team === 'south' }"];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { vchart, container, release } = createChart(
    el,
    ctx,
    { type: 'bar', data: [{ id: 'sales', values: salesRows }], xField: ['day', 'team'], yField: 'sales', seriesField: 'team', legends: { visible: !ctx.preview } },
    { previewHeight: 130 },
  );
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 3 : 8);

  // One handler, re-attached with the chosen query; vchart.off(name, handler) removes it again.
  const handler = (e: { datum?: Record<string, unknown>; mark?: { name?: string }; model?: { type?: string } }): void => {
    log(`click: mark ${e.mark?.name ?? '-'}, model ${e.model?.type ?? '-'}, datum ${e.datum ? `${e.datum.day} ${e.datum.team} ${e.datum.sales}` : 'none'}`);
  };
  let released = false;
  const listen = (name: string): void => {
    vchart.off('click', handler as never);
    log(`listening with ${name}`);
    if (name === QUERIES[1]) vchart.on('click', { level: 'mark', type: 'bar' }, handler as never);
    else if (name === QUERIES[2]) vchart.on('click', { markName: 'bar' }, handler as never);
    else if (name === QUERIES[3]) vchart.on('click', { filter: ({ datum }: { datum?: Record<string, unknown> }) => datum?.team === 'south' } as never, handler as never);
    else vchart.on('click', handler as never);
  };
  listen(QUERIES[0] as string);

  let stop = (): void => {};
  if (ctx.preview) {
    // Clicks are fired at the bars from code, cycling the query so the log shows what each one lets through.
    let i = 0;
    stop = every(900, () => {
      if (released) return;
      i += 1;
      if (i % 6 === 1) listen(pick(QUERIES, Math.floor(i / 6)));
      const row = pick(salesRows, i * 3);
      clickDatum(vchart, container, row);
    });
  } else if (bar) {
    select(bar, 'query', QUERIES, listen);
    const row = (n: number): Record<string, unknown> => pick(salesRows, n);
    let n = 0;
    const b = document.createElement('button');
    b.textContent = 'Click a bar from code';
    b.addEventListener('click', () => clickDatum(vchart, container, row(n++)));
    bar.append(b);
  }

  return () => {
    released = true;
    stop();
    vchart.off('click', handler as never);
    release();
  };
};

export default mount;

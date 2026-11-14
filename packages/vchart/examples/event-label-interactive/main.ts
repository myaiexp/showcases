// label.interactive turns on label events for a type label query
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { eventLog, salesRows } from '../../shared/events-data.ts';

const rows = salesRows.filter((d) => d.team === 'north');

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const build = (interactive: boolean): never =>
    ({
      type: 'bar',
      data: [{ id: 'sales', values: rows }],
      xField: 'day',
      yField: 'sales',
      // Colour tells the two states apart in the card: gold labels take events, grey ones do not.
      label: { visible: true, interactive, position: 'top', style: { fill: interactive ? '#FFDB26' : '#8B93A5', fontSize: 14 } },
    }) as never;

  // The chart goes into its own host, so rebuilding keeps it above the log.
  const host = document.createElement('div');
  el.append(host);
  let current = createChart(el, ctx, build(false), { previewHeight: 130, parent: host });
  const out = readout(el);
  const log = eventLog(out, ctx.preview ? 3 : 10);
  let released = false;

  const attach = (): void => {
    current.vchart.on('click', { level: 'model', type: 'label' } as never, () => log('click: caught by { level: model, type: label }'));
    current.vchart.on('click', { level: 'mark', type: 'bar' } as never, () => log('click: caught by { level: mark, type: bar }'));
    // Every click, with the graphic that was hit.
    current.vchart.on('click', ((e: { event?: { target?: { name?: string } } }) => log(`  (any click: node ${e.event?.target?.name || 'unnamed'})`)) as never);
  };
  attach();

  const setInteractive = (on: boolean): void => {
    if (released) return;
    current.release();
    current = createChart(el, ctx, build(on), { previewHeight: 130, parent: host });
    attach();
    log(`label.interactive: ${on}${on ? ' (gold labels hear clicks)' : ''}`);
  };
  log('label.interactive: false');

  let stop = (): void => {};
  if (ctx.preview) {
    let on = false;
    stop = every(1800, () => {
      on = !on;
      setInteractive(on);
    });
  } else if (bar) {
    select(bar, 'label.interactive', ['false', 'true'], (v) => setInteractive(v === 'true'));
    log('Click a bar, then a label, with each setting.');
  }

  return () => {
    released = true;
    stop();
    current.release();
  };
};

export default mount;

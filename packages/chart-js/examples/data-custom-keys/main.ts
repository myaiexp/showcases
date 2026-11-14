// Plot a column of a sales table directly: parsing names the fields to read
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';
import { RECORDS, type MonthRecord } from '../../shared/general-data.ts';

type Column = 'online' | 'store' | 'returns';
const COLUMNS: readonly Column[] = ['online', 'store', 'returns'];
const COLOURS: Record<Column, string> = { online: C.blue, store: C.amber, returns: C.red };

/** The raw rows as a small HTML table, so the reader sees what the chart is reading. */
function table(el: HTMLElement): void {
  const t = document.createElement('table');
  t.style.cssText = 'font: 12px ui-monospace, monospace; color: var(--fg-2); margin: 0 0 10px; border-collapse: collapse';
  const head = ['month', ...COLUMNS];
  t.innerHTML =
    `<tr>${head.map((h) => `<th style="padding:2px 12px 2px 0;text-align:left">${h}</th>`).join('')}</tr>` +
    RECORDS.map((r) => `<tr>${head.map((h) => `<td style="padding:2px 12px 2px 0">${r[h as keyof MonthRecord]}</td>`).join('')}</tr>`).join('');
  el.append(t);
}

const mount: Mount = (el, ctx) => {
  if (!ctx.preview) table(el);
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180, height: 300 });
  const label = caption(el);

  // data-structures.md § Object[] using custom properties: the rows stay as they are.
  const chart = new Chart<'bar', MonthRecord[]>(stage.canvas, {
    type: 'bar',
    data: {
      datasets: [
        {
          label: 'Orders',
          data: RECORDS,
          parsing: { xAxisKey: 'month', yAxisKey: 'online' },
          backgroundColor: alpha(C.blue, 0.6),
          borderColor: C.blue,
          borderWidth: 1,
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } },
    },
  });

  const show = (column: Column): void => {
    const ds = chart.data.datasets[0]!;
    ds.label = column;
    ds.parsing = { xAxisKey: 'month', yAxisKey: column };
    ds.backgroundColor = alpha(COLOURS[column], 0.6);
    ds.borderColor = COLOURS[column];
    chart.update();
    label.textContent = ctx.preview ? `yAxisKey: '${column}'` : `parsing: { xAxisKey: 'month', yAxisKey: '${column}' }`;
  };
  show('online');

  if (bar) select(bar, 'yAxisKey', COLUMNS, 'online', show);
  const stop = ctx.preview ? cycle(COLUMNS, 2000, (c) => show(c)) : () => {};

  return () => {
    stop();
    stage.release(chart as unknown as Chart); // release() takes the default chart type
  };
};

export default mount;

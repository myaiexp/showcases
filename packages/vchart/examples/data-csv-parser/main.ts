// CSV text as a data source: parser type csv, then fold, updated with updateData
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { button, controlBar, createChart, every, readout } from '../../shared/chart.ts';

const CSVS = [
  `date,class No.1,class No.2
Monday,20,30
Tuesday,25,28
Wednesday,31,22
Thursday,18,35`,
  `date,class No.1,class No.2
Monday,34,12
Tuesday,15,26
Wednesday,22,30
Thursday,29,19
Friday,36,24`,
];

const spec: ISpec = {
  type: 'bar',
  data: [
    {
      id: 'barData',
      values: CSVS[0] ?? '',
      parser: { type: 'csv' },
      transforms: [{ type: 'fold', options: { key: 'class', value: 'score', fields: ['class No.1', 'class No.2'] } }],
    },
  ],
  seriesField: 'class',
  xField: ['date', 'class'],
  yField: 'score',
} as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const chart = createChart(el, ctx, spec);
  let alive = true;
  const push = (csv: string): void => {
    if (alive) void chart.vchart.updateData('barData', csv, { type: 'csv' });
  };
  let stop = (): void => {};
  if (bar) {
    const area = document.createElement('textarea');
    area.value = CSVS[0] ?? '';
    area.rows = 6;
    area.style.cssText = 'width:100%;font:12px monospace;margin-top:8px';
    const out = readout(el);
    out.textContent = 'Edit the CSV, then press Apply.';
    el.append(area);
    button(bar, 'Apply CSV', () => {
      push(area.value);
      out.textContent = `updateData('barData', csv, { type: 'csv' }) with ${area.value.split('\n').length - 1} data rows`;
    });
    button(bar, 'Load sample 2', () => {
      area.value = CSVS[1] ?? '';
      push(area.value);
    });
  } else {
    let i = 0;
    stop = every(2000, () => push(CSVS[++i % 2] ?? ''));
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

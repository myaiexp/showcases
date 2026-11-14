// Flat data and the fold transform: wide rows become one row per bar
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, readout, select } from '../../shared/chart.ts';
import { seeded } from '../../shared/concepts-data.ts';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const rand = seeded(12);
const wide = (): Record<string, string | number>[] =>
  DAYS.map((date) => ({ date, 'class No.1': Math.round(15 + rand() * 20), 'class No.2': Math.round(15 + rand() * 20) }));
const flat = (): Record<string, string | number>[] =>
  wide().flatMap((r) => ['class No.1', 'class No.2'].map((cls) => ({ date: String(r.date), class: cls, score: Number(r[cls]) })));

const MODES = ['flat rows', 'wide rows + fold'] as const;
type Mode = (typeof MODES)[number];

const specFor = (mode: Mode): ISpec =>
  ({
    type: 'bar',
    data: [
      mode === 'flat rows'
        ? { id: 'barData', values: flat() }
        : {
            id: 'barData',
            values: wide(),
            transforms: [{ type: 'fold', options: { key: 'class', value: 'score', fields: ['class No.1', 'class No.2'] } }],
          },
    ],
    seriesField: 'class',
    xField: ['date', 'class'],
    yField: 'score',
    legends: { visible: true, orient: 'top' },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let mode: Mode = 'wide rows + fold';
  let chart = createChart(el, ctx, specFor(mode));
  const out = bar ? readout(el) : null;
  const show = (): void => {
    chart.release();
    chart = createChart(el, ctx, specFor(mode));
    if (out) {
      const view = chart.vchart.getDataSet().getDataView('barData');
      out.textContent = `first rows read by the series:\n${JSON.stringify(view?.latestData?.slice(0, 4))}`;
    }
  };
  show();
  let stop = (): void => {};
  if (bar) select(bar, 'data shape', MODES, (v) => { mode = v as Mode; show(); }).value = mode;
  else stop = every(2000, () => { mode = mode === 'flat rows' ? 'wide rows + fold' : 'flat rows'; show(); });
  return () => {
    stop();
    chart.release();
  };
};

export default mount;

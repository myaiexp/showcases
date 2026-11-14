// Series stacking: grouped, stacked and percent layouts from the stack and percent options
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded, type Datum } from '../../shared/concepts-data.ts';

const MODES = ['grouped', 'stack', 'percent'] as const;
type Mode = (typeof MODES)[number];
const rand = seeded(21);
const values = (): Datum[] =>
  ['Q1', 'Q2', 'Q3', 'Q4'].flatMap((quarter) =>
    ['North', 'South', 'West'].map((region) => ({ quarter, region, sales: Math.round(20 + rand() * 60) })),
  );

function specFor(mode: Mode): ISpec {
  return {
    type: 'bar',
    data: [{ id: 'sales', values: values() }],
    xField: 'quarter',
    yField: 'sales',
    seriesField: 'region',
    stack: mode !== 'grouped',
    percent: mode === 'percent',
    label: { visible: true },
    legends: { visible: true, orient: 'top' },
  } as ISpec;
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let mode: Mode = 'stack';
  let chart = createChart(el, ctx, specFor(mode));
  const rebuild = (): void => {
    chart.release();
    chart = createChart(el, ctx, specFor(mode));
  };
  let stop = (): void => {};
  if (bar) {
    select(bar, 'layout', MODES, (v) => {
      mode = v as Mode;
      rebuild();
    }).value = mode;
  } else {
    stop = every(1800, () => {
      mode = MODES[(MODES.indexOf(mode) + 1) % MODES.length] ?? 'stack';
      rebuild();
    });
  }
  return () => {
    stop();
    chart.release();
  };
};

export default mount;

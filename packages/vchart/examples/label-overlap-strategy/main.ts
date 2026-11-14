// Label overlap strategies: label.overlap as false, hideOnHit and strategy chains
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';
import { seeded, type Datum } from '../../shared/concepts-data.ts';

const rand = seeded(31);
// Some segments are thin on purpose, so their inside labels collide.
const rows: Datum[] = ['A', 'B', 'C', 'D', 'E', 'F'].flatMap((name) =>
  ['7+', '6-7', '4-5', '2-3', '1'].map((group) => ({ name, group, value: rand() < 0.4 ? 0.01 + rand() * 0.03 : 0.1 + rand() * 0.4 })),
);

const OVERLAPS: Record<string, unknown> = {
  'default (hide on hit)': undefined,
  'overlap: false': false,
  'hideOnHit: false': { hideOnHit: false },
  'position strategy': { strategy: [{ type: 'position', position: ['inside-top', 'top'] }] },
  'bound + moveY': {
    strategy: [
      { type: 'bound', position: ['top'] },
      { type: 'moveY', offset: [-2, -4, -8, -10, -12] },
    ],
  },
};
const NAMES = Object.keys(OVERLAPS);

const specFor = (name: string): ISpec => {
  const overlap = OVERLAPS[name];
  return {
    type: 'bar',
    stack: true,
    data: [{ values: rows }],
    color: ['#009DB5', '#F0B71F', '#EB6F02', '#1E5273', '#3BA140'],
    xField: 'name',
    yField: 'value',
    seriesField: 'group',
    label: {
      visible: true,
      position: 'inside',
      formatMethod: (text: unknown) => Number(text).toFixed(2),
      style: { stroke: 'white', lineWidth: 2, fontSize: 11 },
      ...(overlap === undefined ? {} : { overlap }),
    },
  } as unknown as ISpec;
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let name = NAMES[0] ?? '';
  let chart = createChart(el, ctx, specFor(name));
  const show = (n: string): void => {
    name = n;
    chart.release();
    chart = createChart(el, ctx, specFor(n));
  };
  let stop = (): void => {};
  if (bar) select(bar, 'label.overlap', NAMES, show);
  else stop = every(2000, () => show(NAMES[(NAMES.indexOf(name) + 1) % NAMES.length] ?? ''));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;

// Custom label text: style.text, formatMethod, formatter and rich text
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select } from '../../shared/chart.ts';

const ROWS = [
  { city: 'Oslo', people: 709037 },
  { city: 'Bergen', people: 291189 },
  { city: 'Trondheim', people: 212660 },
  { city: 'Stavanger', people: 148682 },
  { city: 'Tromso', people: 77095 },
];
type Datum = { city: string; people: number };

const LABELS: Record<string, Record<string, unknown>> = {
  'style.text function': { style: { text: (datum: Datum) => datum.people.toLocaleString('en-US') } },
  formatMethod: { formatMethod: (text: unknown) => `${Math.round(Number(text) / 1000)}k` },
  formatter: { formatter: '{city}: {people}' },
  'rich text': {
    formatMethod: (text: unknown) => ({
      type: 'rich',
      text: [
        { text: `${Math.round(Number(text) / 1000)}`, fontSize: 16, fontWeight: 'bold', fill: '#ffd43b' },
        { text: ' thousand', fontSize: 10, fill: '#adb5bd' },
      ],
    }),
  },
};
const NAMES = Object.keys(LABELS);

const specFor = (name: string): ISpec =>
  ({
    type: 'bar',
    data: [{ values: ROWS }],
    xField: 'city',
    yField: 'people',
    label: { visible: true, position: 'top', ...LABELS[name] },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  let chart = createChart(el, ctx, specFor(NAMES[0] ?? ''));
  let name = NAMES[0] ?? '';
  const show = (n: string): void => {
    name = n;
    chart.release();
    chart = createChart(el, ctx, specFor(n));
  };
  let stop = (): void => {};
  if (bar) select(bar, 'label text', NAMES, show);
  else stop = every(1800, () => show(NAMES[(NAMES.indexOf(name) + 1) % NAMES.length] ?? ''));
  return () => {
    stop();
    chart.release();
  };
};

export default mount;

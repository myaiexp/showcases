// Weather records with nested fields, read through dotted parsing keys
import type { Mount } from '@/types.ts';
import { Chart, caption, createStage, cycle } from '../../shared/stage.ts';
import { controlBar, select } from '../../shared/controls.ts';
import { C, alpha } from '../../shared/data.ts';

interface Forecast {
  city: string;
  stats: { high: number; low: number; rain: number };
  'wind.kph': number; // a field whose own name contains a dot
}

const CITIES: Forecast[] = [
  { city: 'Oulu', stats: { high: 4, low: -3, rain: 12 }, 'wind.kph': 14 },
  { city: 'Tampere', stats: { high: 7, low: 0, rain: 18 }, 'wind.kph': 11 },
  { city: 'Helsinki', stats: { high: 9, low: 3, rain: 22 }, 'wind.kph': 19 },
  { city: 'Turku', stats: { high: 8, low: 2, rain: 20 }, 'wind.kph': 17 },
  { city: 'Vaasa', stats: { high: 6, low: -1, rain: 15 }, 'wind.kph': 23 },
];

// [menu text, the key as written in parsing, colour]
const KEYS = [
  ['stats.high', 'stats.high', C.red],
  ['stats.low', 'stats.low', C.blue],
  ['stats.rain', 'stats.rain', C.cyan],
  ['wind.kph (escaped)', 'wind\\.kph', C.purple],
] as const;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const stage = createStage(el, ctx, { previewHeight: 180 });
  const label = caption(el);

  const chart = new Chart<'bar', Forecast[]>(stage.canvas, {
    type: 'bar',
    data: { datasets: [{ label: 'Forecast', data: CITIES, parsing: { xAxisKey: 'city', yAxisKey: 'stats.high' } }] },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false } } },
  });

  const show = (i: number): void => {
    const [name, key, color] = KEYS[i]!;
    const ds = chart.data.datasets[0]!;
    // data-structures.md: nested fields use dots; a dot inside a name is escaped with \\.
    ds.parsing = { xAxisKey: 'city', yAxisKey: key };
    ds.label = name;
    ds.backgroundColor = alpha(color, 0.6);
    ds.borderColor = color;
    ds.borderWidth = 1;
    chart.update();
    label.textContent = `yAxisKey: '${key.replace('\\', '\\\\')}'`;
  };
  show(0);

  if (bar) {
    const names: string[] = KEYS.map((k) => k[0]);
    select(bar, 'yAxisKey', names, names[0] ?? '', (v) => show(names.indexOf(v)));
  }
  const stop = ctx.preview ? cycle(KEYS, 2000, (_k, i) => show(i)) : () => {};

  return () => {
    stop();
    stage.release(chart as unknown as Chart); // release() takes the default chart type
  };
};

export default mount;

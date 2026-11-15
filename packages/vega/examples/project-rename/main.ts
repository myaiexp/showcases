// Project: keep chosen fields, unnest sub-fields and rename them
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle, rowsOf, tableMarks } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const names = ['Oulu', 'Kemi', 'Rovala', 'Kuusamo', 'Sodan', 'Ivalo'];
const make = (n: number): object[] => {
  const rand = rng(200 + n);
  return names.map((name) => ({
    station: { name, alt: Math.round(20 + rand() * 280) },
    reading: { temp: Math.round((-12 + rand() * 20) * 10) / 10 },
    checked: 'yes',
  }));
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 240,
    height: 170,
    padding: 5,
    data: [
      { name: 'raw', values: make(0) },
      {
        name: 'flat',
        source: 'raw',
        // Pull nested fields out into flat ones and rename them; `checked` is left behind.
        transform: [{ type: 'project', fields: ['station.name', 'station.alt', 'reading.temp'], as: ['name', 'altitude', 'temp'] }],
      },
      rowsOf('rows', 'flat', 6),
      rowsOf('before', 'raw', 6),
    ],
    scales: [
      { name: 'y', type: 'band', domain: names, range: 'height', padding: 0.15 },
      { name: 'x', type: 'linear', domain: [-14, 10], range: 'width' },
      { name: 'fill', type: 'linear', domain: [0, 300], range: ['#8ef', '#357'] },
    ],
    axes: [{ orient: 'left', scale: 'y' }, { orient: 'bottom', scale: 'x', title: 'temp' }],
    marks: [
      {
        type: 'rect',
        from: { data: 'flat' },
        encode: {
          update: {
            y: { scale: 'y', field: 'name' },
            height: { scale: 'y', band: 1 },
            x: { scale: 'x', value: 0 },
            x2: { scale: 'x', field: 'temp' },
            fill: { scale: 'fill', field: 'altitude' },
          },
        },
      },
      ...tableMarks('before', [{ field: 'station', title: 'raw station', width: 80 }, { field: 'reading', title: 'raw reading', width: 80 }, { field: 'checked', width: 60 }], { gap: 30 }),
      ...tableMarks('rows', [{ field: 'name', width: 60 }, { field: 'altitude', title: 'altitude', width: 62 }, { field: 'temp' }], { gap: 30, top: 130 }),
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'raw', make, 2200);
  return () => stage.dispose();
};

export default mount;

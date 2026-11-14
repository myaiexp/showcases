// extensionMark { type: 'group', children }: a group of rect and text children, each bound to the series data
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { createChart, every } from '../../shared/chart.ts';
import { rng } from '../../shared/components-data.ts';

const CATS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface Datum {
  x: string;
  y: number;
}
interface Pos {
  valueToX(v: string[]): number;
  valueToY(v: number[]): number;
  xBandwidth(): number;
}

const mount: Mount = (el, ctx) => {
  const r = rng(77);
  const frame = (): Datum[] => CATS.map((x) => ({ x, y: Math.round(20 + r() * 60) }));
  const spec = {
    type: 'bar',
    data: [{ id: 'd', values: frame() }],
    xField: 'x',
    yField: 'y',
    legends: { visible: false },
    axes: [{ orient: 'left', type: 'linear', max: 100, min: 0 }, { orient: 'bottom', type: 'band' }],
    extensionMark: [
      {
        type: 'group',
        // One container for the badges; the children bind the series data themselves, one mark per datum.
        children: [
          {
            type: 'rect',
            dataId: 'd',
            style: {
              x: (d: Datum, c: Pos) => c.valueToX([d.x]) + c.xBandwidth() / 2 - 18,
              y: (d: Datum, c: Pos) => c.valueToY([d.y]) - 28,
              width: 36,
              height: 20,
              cornerRadius: 5,
              fill: (d: Datum) => (d.y >= 60 ? '#2fb86b' : '#e5534b'),
            },
          },
          {
            type: 'text',
            dataId: 'd',
            style: {
              text: (d: Datum) => String(d.y),
              x: (d: Datum, c: Pos) => c.valueToX([d.x]) + c.xBandwidth() / 2,
              y: (d: Datum, c: Pos) => c.valueToY([d.y]) - 18,
              textAlign: 'center',
              textBaseline: 'middle',
              fontSize: 12,
              fontWeight: 'bold',
              fill: '#ffffff',
            },
          },
        ],
      },
    ],
  } as unknown as ISpec;
  const chart = createChart(el, ctx, spec);
  let alive = true;
  const stop = every(2000, () => {
    if (alive) void chart.vchart.updateData('d', frame());
  });
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

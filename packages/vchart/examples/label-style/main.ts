// Label options: visible, position, offset and style on a line series
import type { Mount } from '@/types.ts';
import type { ISpec } from '@visactor/vchart';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const HOURS = ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
const TEMPS = [8, 9, 11, 14, 16, 17, 17, 16, 15];
const POSITIONS = ['top', 'bottom', 'left', 'right', 'center'];

interface Opts { position: string; offset: number; fontSize: number; weight: string }

const specFor = ({ position, offset, fontSize, weight }: Opts): ISpec =>
  ({
    type: 'line',
    data: { values: HOURS.map((time, i) => ({ time, value: TEMPS[i] })) },
    xField: 'time',
    yField: 'value',
    label: {
      visible: true,
      position,
      offset,
      overlap: false,
      style: { fill: '#ffd43b', fontSize, fontWeight: weight },
    },
  }) as unknown as ISpec;

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const o: Opts = { position: 'top', offset: 2, fontSize: 14, weight: 'bold' };
  const chart = createChart(el, ctx, specFor(o));
  let alive = true;
  const apply = (): void => {
    if (alive) void chart.vchart.updateSpec(specFor(o));
  };
  let i = 0;
  const stop = bar ? (): void => {} : every(1300, () => {
    o.position = POSITIONS[++i % POSITIONS.length] ?? 'top';
    apply();
  });
  if (bar) {
    select(bar, 'position', POSITIONS, (v) => { o.position = v; apply(); });
    slider(bar, 'offset', [0, 24, 1], o.offset, (v) => { o.offset = v; apply(); });
    slider(bar, 'fontSize', [10, 28, 1], o.fontSize, (v) => { o.fontSize = v; apply(); });
    select(bar, 'fontWeight', ['bold', 'normal'], (v) => { o.weight = v; apply(); });
  }
  return () => {
    alive = false;
    stop();
    chart.release();
  };
};

export default mount;

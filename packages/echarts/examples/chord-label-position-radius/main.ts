// Chord diagram: label.position inside/outside, ring radius and sector borderRadius
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const countries = ['Brazil', 'Chile', 'Peru', 'Spain', 'Italy', 'Japan'];
// [source, target, value]: exports in billions.
const trade: [number, number, number][] = [
  [0, 3, 12], [0, 5, 9], [0, 4, 6], [1, 5, 11], [1, 3, 5], [2, 3, 7], [2, 5, 4],
  [3, 0, 8], [3, 4, 14], [4, 3, 10], [5, 0, 5], [5, 1, 3],
];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (position: string, inner: number, rounding: number, clockwise: boolean): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'chord',
          // radius: [inner, outer] of the ring of sectors; the chords fill the hole.
          radius: [`${inner}%`, '82%'],
          center: ['50%', '50%'],
          clockwise,
          padAngle: 2,
          // label.position: 'outside' puts the names around the ring, 'inside' on the sectors.
          label: { show: true, position, fontSize: ctx.preview ? 10 : 12 },
          // borderRadius rounds the corners of each sector.
          itemStyle: { borderRadius: rounding, borderWidth: 1, borderColor: '#222' },
          lineStyle: { color: 'source', opacity: 0.4 },
          data: countries.map((name) => ({ name })),
          links: trade.map(([s, t, value]) => ({ source: countries[s], target: countries[t], value })),
          animationDurationUpdate: 600,
        },
      ],
    });
  };

  let position = 'outside';
  let inner = 70;
  let rounding = 6;
  let clockwise = true;
  render(position, inner, rounding, clockwise);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1800, () => {
      i++;
      position = i % 2 ? 'inside' : 'outside';
      inner = i % 2 ? 50 : 72;
      rounding = i % 2 ? 12 : 4;
      render(position, inner, rounding, clockwise);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'label.position', ['outside', 'inside'], (v) => {
    position = v;
    render(position, inner, rounding, clockwise);
  });
  slider(bar!, 'inner radius %', [20, 78, 2], inner, (v) => {
    inner = v;
    render(position, inner, rounding, clockwise);
  });
  slider(bar!, 'borderRadius', [0, 20, 1], rounding, (v) => {
    rounding = v;
    render(position, inner, rounding, clockwise);
  });
  const cb = button(bar!, 'clockwise: on', () => {
    clockwise = !clockwise;
    cb.textContent = `clockwise: ${clockwise ? 'on' : 'off'}`;
    render(position, inner, rounding, clockwise);
  });

  return dispose;
};

export default mount;

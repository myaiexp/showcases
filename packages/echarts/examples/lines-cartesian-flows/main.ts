// series.lines on a cartesian grid: arrows from each score pair before to after, with labels and curveness
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';
import { gauss, rng } from '../../shared/scatter-data.ts';

interface Move {
  name: string;
  from: [number, number];
  to: [number, number];
}

/** 36 made-up students: [maths, reading] before and after a term. */
function moves(): Move[] {
  const r = rng(5);
  return Array.from({ length: 36 }, (_, i) => {
    const from: [number, number] = [30 + r() * 50, 30 + r() * 50];
    const to: [number, number] = [
      Math.max(5, Math.min(98, from[0] + 6 + gauss(r) * 8)),
      Math.max(5, Math.min(98, from[1] + 2 + gauss(r) * 10)),
    ];
    return { name: `S${String(i + 1).padStart(2, '0')}`, from, to };
  });
}
const MOVES = moves();
const dist = (m: Move): number => Math.hypot(m.to[0] - m.from[0], m.to[1] - m.from[1]);
// The six longest moves get a label; large mode would ignore it, so it stays off.
const LABELLED = new Set([...MOVES].sort((a, b) => dist(b) - dist(a)).slice(0, 6).map((m) => m.name));

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });
  const s = { curve: 0, position: 'end', width: 2 };

  const lines = (): object => ({
    type: 'lines',
    // With coordinateSystem 'cartesian2d' the coords are [x, y] on the axes of the grid.
    coordinateSystem: 'cartesian2d',
    data: MOVES.map((m) => {
      const gain = m.to[0] - m.from[0];
      return {
        name: m.name,
        coords: [m.from, m.to],
        // Lines that moved right (more maths) are blue, the others orange.
        lineStyle: { color: gain >= 0 ? '#5aa3d6' : '#f29e4c' },
        label: {
          show: LABELLED.has(m.name),
          position: s.position,
          formatter: `{b} ${gain >= 0 ? '+' : ''}${gain.toFixed(0)}`,
          color: '#e6e6e6',
          fontSize: 11,
        },
      };
    }),
    // A dot at the start of each line and an arrow at its end; one entry per end.
    symbol: ['circle', 'arrow'],
    symbolSize: 7,
    lineStyle: { width: s.width, opacity: 0.8, curveness: s.curve },
    emphasis: { lineStyle: { width: s.width + 2, opacity: 1 }, label: { show: true } },
    tooltip: { formatter: '{b}' },
  });

  chart.setOption({
    tooltip: {},
    // The lines sit on a grid with two value axes; the legend is off, so the grid can use the room.
    grid: { left: 52, right: 24, top: 24, bottom: 48 },
    xAxis: { type: 'value', name: 'Maths', nameLocation: 'middle', nameGap: 28, min: 0, max: 100, splitLine: { lineStyle: { opacity: 0.2 } } },
    yAxis: { type: 'value', name: 'Reading', nameLocation: 'middle', nameGap: 36, min: 0, max: 100, splitLine: { lineStyle: { opacity: 0.2 } } },
    series: [lines()],
  });
  const apply = (): void => {
    chart.setOption({ series: [lines()] });
  };

  if (bar) {
    slider(bar, 'curveness', [-0.5, 0.5, 0.05], s.curve, (v) => {
      s.curve = v;
      apply();
    });
    slider(bar, 'lineStyle.width', [1, 6, 1], s.width, (v) => {
      s.width = v;
      apply();
    });
    select(bar, 'label.position', ['start', 'middle', 'end'], (v) => {
      s.position = v;
      apply();
    }).value = s.position;
  }

  let t = 0;
  const stop = ctx.preview
    ? every(1800, () => {
        t++;
        s.curve = [0, 0.3, -0.3][t % 3]!;
        s.position = ['end', 'middle', 'start'][t % 3]!;
        apply();
      })
    : (): void => {};

  return () => {
    stop();
    dispose();
  };
};

export default mount;

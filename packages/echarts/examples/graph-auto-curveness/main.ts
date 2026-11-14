// Graph where parallel edges are fanned out by autoCurveness (true, a number or an array)
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const names = ['Paris', 'Berlin', 'Rome', 'Vienna'];
// Fixed positions (layout 'none'). A circular layout bends edges toward the circle's centre,
// so an edge across the middle (Paris–Rome) could not curve at all.
const positions: [number, number][] = [[0, 0], [100, 0], [100, 70], [0, 70]];
// Pairs of nodes with several links each (flights on different days, say).
const pairs: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]];

const MODES = ['off', 'true', '6', '10', 'array'] as const;
type Mode = (typeof MODES)[number];

// autoCurveness: false (off), true (array of 20), a number (length of the generated array)
// or the curveness values themselves. The array here has six entries.
const modeValue = (mode: Mode): boolean | number | number[] => {
  if (mode === 'off') return false;
  if (mode === 'true') return true;
  if (mode === 'array') return [0, 0.2, 0.4, 0.6, 0.8, 1];
  return Number(mode);
};

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 460 });

  const render = (mode: Mode, count: number): void => {
    const links = pairs.flatMap(([s, t]) =>
      Array.from({ length: count }, () => ({ source: names[s]!, target: names[t]! })),
    );
    chart.setOption({
      series: [
        {
          type: 'graph',
          layout: 'none',
          data: names.map((name, i) => ({ name, x: positions[i]![0], y: positions[i]![1] })),
          links,
          symbolSize: 44,
          label: { show: true, position: 'inside' },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: 8,
          // The links set no lineStyle.curveness of their own: when one is set,
          // autoCurveness has no effect.
          autoCurveness: modeValue(mode),
          lineStyle: { opacity: 0.8, width: 1.5 },
          // The nodes are fitted into this box; the margin leaves room for the outermost arcs.
          left: '20%',
          right: '20%',
          top: ctx.preview ? 40 : 120,
          bottom: ctx.preview ? 40 : 120,
          // Without it the node positions are stretched to the box and the round nodes with them.
          preserveAspect: true,
          animationDurationUpdate: 500,
        },
      ],
    });
  };

  let mode: Mode = 'true';
  let count = 4;
  render(mode, count);

  if (ctx.preview) {
    let i = 0;
    const stop = every(1800, () => {
      i++;
      mode = MODES[i % MODES.length]!;
      render(mode, 4);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'autoCurveness', MODES, (v) => {
    mode = v as Mode;
    render(mode, count);
  }).value = mode;
  // At most six parallel edges, the size of the shortest curveness array on offer.
  slider(bar!, 'edges per pair', [1, 6, 1], count, (v) => {
    count = v;
    render(mode, count);
  });

  return dispose;
};

export default mount;

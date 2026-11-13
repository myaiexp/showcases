// Chord diagram of flows between regions, cycling the three edge colouring modes
import type { Mount } from '@/types.ts';
import { controlBar, createChart, every, select, slider } from '../../shared/chart.ts';

const regions = ['North', 'East', 'South', 'West', 'Central', 'Coast', 'Islands'];
// [source, target, value]: how much each region ships to another.
const flows: [number, number, number][] = [
  [0, 1, 40], [0, 4, 25], [1, 2, 30], [1, 5, 18], [2, 3, 22], [2, 6, 9],
  [3, 0, 35], [3, 4, 14], [4, 5, 28], [4, 1, 12], [5, 6, 16], [5, 0, 10], [6, 2, 6], [6, 3, 4],
];

const COLOR_MODES = ['source', 'target', 'gradient'] as const;
type ColorMode = (typeof COLOR_MODES)[number];

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  const { chart, dispose } = createChart(el, ctx, { height: 480 });

  const render = (colour: ColorMode, padAngle: number): void => {
    chart.setOption({
      tooltip: {},
      series: [
        {
          type: 'chord',
          // Sectors run counter-clockwise from 90°; padAngle leaves a gap between them.
          clockwise: false,
          startAngle: 90,
          padAngle,
          // Tiny regions keep a usable sector even when their total is small.
          minAngle: 6,
          radius: ctx.preview ? ['76%', '86%'] : ['70%', '80%'],
          label: { show: !ctx.preview },
          // lineStyle.color: take each chord's colour from its source node, its target
          // node, or a gradient between the two.
          lineStyle: { color: colour, opacity: 0.35 },
          // Hovering a region fades everything but its own chords and partners.
          emphasis: { focus: 'adjacency' },
          data: regions.map((name) => ({ name })),
          links: flows.map(([s, t, value]) => ({ source: regions[s], target: regions[t], value })),
        },
      ],
    });
  };

  let colour: ColorMode = 'gradient';
  let pad = 3;
  render(colour, pad);

  if (ctx.preview) {
    let i = 0;
    const stop = every(2200, () => {
      i = (i + 1) % COLOR_MODES.length;
      render(COLOR_MODES[i]!, pad);
    });
    return () => {
      stop();
      dispose();
    };
  }

  select(bar!, 'lineStyle.color', COLOR_MODES, (v) => {
    colour = v as ColorMode;
    render(colour, pad);
  }).value = colour;
  slider(bar!, 'padAngle', [0, 12, 1], pad, (v) => {
    pad = v;
    render(colour, pad);
  });

  return dispose;
};

export default mount;

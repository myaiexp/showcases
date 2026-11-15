// tickLabels callbacks: per-candidate font, anchor and offset from value, index, position and bandwidth
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(8);
const weeks = Array.from({ length: 8 }, (_, i) => i + 1);
const rows = weeks.map((week) => ({ id: `w${week}`, week, value: Math.round(30 + random() * 60) }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Toggle the callbacks: week 1 hangs from its band edge, week 8 is bold.' });
  const build = (styled: boolean) =>
    defineChart({
      marks: [barY(rows, { x: 'week', y: 'value', fill: '#818cf8' })],
      scales: {
        x: {
          scale: scaleBand<number>().domain(weeks).padding(0.2),
          axis: styled
            ? {
                tickLabels: {
                  fontSize: ({ index }) => (index === 0 || index === weeks.length - 1 ? 13 : undefined),
                  fontWeight: ({ value }) => (value === 8 ? 800 : undefined),
                  opacity: 0.75,
                  anchor: ({ index }) => (index === 0 ? 'start' : undefined),
                  dx: ({ index, bandwidth }) => (index === 0 ? -bandwidth / 2 : undefined),
                  dy: ({ index }) => (index % 2 ? 4 : undefined),
                },
              }
            : {},
        },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });
  const options = (styled: boolean) => ({ definition: build(styled), height: stage.height, ariaLabel: 'Values for eight weeks' });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'tick label callbacks', true, (v) => host.update(options(v)));
  else stage.cycle([true, false], 2000, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;

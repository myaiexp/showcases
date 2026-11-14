// Tick label thinning: crowded labels are dropped by measured bounds; keep and priority protect chosen ones
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(77);
const rows = Array.from({ length: 36 }, (_, i) => ({ day: `Day ${i + 1}`, value: Math.round(20 + random() * 60) }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Thinning is on by default. Turn it off to see every label overlap.' });
  let thin = true;
  let rotate = 0;
  let keep = false;

  const build = () =>
    defineChart({
      marks: [barY(rows, { x: 'day', y: 'value' })],
      scales: {
        x: {
          scale: () => scaleBand<string>().padding(0.2),
          axis: { tickLabels: { rotate, thin: thin ? { minGap: 6, priority: 'ends', keep: keep ? ['Day 10', 'Day 20'] : [] } : false } },
        },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Daily values' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    checkbox(stage.bar, 'thin labels', thin, (v) => { thin = v; refresh(); });
    checkbox(stage.bar, 'keep Day 10 and Day 20', keep, (v) => { keep = v; refresh(); });
    slider(stage.bar, 'rotate', -90, 0, 5, rotate, (v) => { rotate = v; refresh(); }, (v) => `${v} deg`);
  } else {
    stage.cycle([[true, 0, false], [true, -60, false], [false, 0, false], [true, 0, true]] as const, 1700, ([t, r, k]) => { thin = t; rotate = r; keep = k; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;

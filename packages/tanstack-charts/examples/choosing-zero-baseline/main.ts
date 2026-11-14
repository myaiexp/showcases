// Bars encode length from a baseline: a truncated axis exaggerates the differences, a zero baseline does not
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = [{ team: 'A', score: 92 }, { team: 'B', score: 94 }, { team: 'C', score: 95 }, { team: 'D', score: 97 }];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let zero = true;
  const build = () =>
    defineChart({
      marks: [barY(rows, { x: 'team', y: 'score', fill: '#60a5fa' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear().domain(zero ? [0, 100] : [90, 100]), grid: true, axis: { label: 'Score' } },
      },
      clip: true,
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Team scores' });
  const host = stage.own(mountChart(stage.box, options()));
  const set = (v: boolean): void => {
    zero = v;
    host.update(options());
    stage.say(v ? 'domain [0, 100]: lengths are proportional to scores' : 'domain [90, 100]: D looks five times taller than A');
  };
  if (stage.bar) checkbox(stage.bar, 'start at zero', true, set);
  else stage.cycle([true, false], 2200, set);
  return () => stage.dispose();
};

export default mount;

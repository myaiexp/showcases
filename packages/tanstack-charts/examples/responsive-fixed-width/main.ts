// A fixed width opts out of container following: one definition, one host with width and one without
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { breathe } from '../../shared/style-box.ts';
import { revenue } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change the width: the left chart re-lays out, the right one is laid out at 240px and only scaled.' });
  const second = stage.addBox();
  // Align both boxes to the top: the scaled chart is taller than the re-laid-out one.
  stage.box.style.alignSelf = 'start';
  second.style.alignSelf = 'start';
  if (stage.preview) second.style.overflow = 'hidden';

  const definition = defineChart({
    marks: [barY(revenue, { x: 'month', y: 'revenue', fill: '#60a5fa' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Revenue, following the container' }));
  stage.own(mountChart(second, { definition, width: 240, height: stage.height, ariaLabel: 'Revenue, fixed at 240 pixels' }));
  stage.say('left: no width option    right: width: 240, scaled to fit');
  if (stage.bar) slider(stage.bar, 'box width', 30, 100, 1, 100, (v) => { stage.box.style.width = `${v}%`; second.style.width = `${v}%`; }, (v) => `${v}%`);
  else {
    breathe(stage, stage.preview ? 85 : 50, 100, 6000, stage.box);
    breathe(stage, stage.preview ? 85 : 50, 100, 6000, second);
  }
  return () => stage.dispose();
};

export default mount;

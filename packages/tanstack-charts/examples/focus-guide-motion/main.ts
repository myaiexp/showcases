// Focus guide motion: the rule glides between points with a spring when the motion() renderer draws it
import { defineChart, lineY } from '@tanstack/charts';
import { focusGuideX } from '@tanstack/charts/focus/guide';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { sensorA } from '../../shared/marks2-series.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Move quickly across the chart: the rule overshoots a little, then settles.' });

  const build = (springy: boolean) =>
    defineChart({
      marks: [
        lineY(sensorA, { id: 'sensor', x: 'month', y: 'value', key: 'id', points: true }),
        focusGuideX(sensorA, {
          id: 'cursor',
          x: 'month',
          y: 'value',
          key: 'id',
          marker: { radius: 6 },
          xLabel: { format: (month) => `M${month + 1}` },
          // Without a motion policy the guide snaps; the policy is only read by the motion() renderer.
          ...(springy ? { motion: { transition: { type: 'spring' as const, stiffness: 240, damping: 14 } } } : {}),
        }),
      ],
      scales: {
        x: { scale: scaleLinear },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = (springy: boolean) => ({
    definition: build(springy),
    renderer: motion(),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Sensor readings with an animated focus guide',
  });
  const host = stage.own(mountChartRenderer(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'spring motion', true, (on) => host.update(options(on)));
  else stage.ghost();
  return () => stage.dispose();
};

export default mount;

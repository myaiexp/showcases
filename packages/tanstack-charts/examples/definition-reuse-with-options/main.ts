// defineChart(definition, options): one base definition, two interaction policies
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { sweep } from '../../shared/stage.ts';
import { signups } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Left: the base, no tooltip. Right: the same base with a tooltip and column-wise focus.' });

  const base = defineChart({
    marks: [barY(signups, { x: 'month', y: 'value' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
  });
  const interactive = defineChart(base, { tooltip, focus: 'nearest-x' });

  const second = stage.addBox();
  stage.own(mountChart(stage.box, { definition: base, height: stage.height, ariaLabel: 'Base chart' }));
  stage.own(mountChart(second, { definition: interactive, height: stage.height, ariaLabel: 'Chart with tooltip' }));
  if (stage.preview) stage.ghost(sweep(), 6000, second);
  return () => stage.dispose();
};

export default mount;

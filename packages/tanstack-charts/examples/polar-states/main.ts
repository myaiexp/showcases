// polar states: one states array on the polar container styles every child arc by focus
import { defineChart, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { budget } from '../../shared/marks2-budget.ts';
import { createStage } from '../../shared/stage.ts';

const slices = pie(budget, { value: 'amount', gapAngle: 0.02 });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a slice. Untick the box to give the arc its own empty states array.' });

  const build = (containerStates: boolean) =>
    defineChart({
      marks: [
        polar({
          // Container states are the default for every child mark.
          states: [
            { when: { focus: 'unmatched' }, style: { opacity: 0.25 }, transition: { type: 'tween', duration: 150 } },
            { when: { focus: 'primary' }, style: { stroke: 'currentColor', strokeWidth: 2 }, transition: { type: 'tween', duration: 150 } },
          ],
          marks: [radialArc(slices, { key: 'name', color: 'name', innerRadius: ({ radius }) => radius * 0.4, ...(containerStates ? {} : { states: [] }) })],
          scales: { angle: null, radius: null },
        }),
      ],
      scales: { x: null, y: null },
      tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}: ${point.datum.value} (${(point.datum.fraction * 100).toFixed(1)}%)`,
    },
    });

  const options = (on: boolean) => ({ definition: build(on), height: stage.height, ariaLabel: 'Donut with focus states' });
  const host = stage.own(mountChart(stage.box, options(true)));
  if (stage.bar) checkbox(stage.bar, 'container states apply', true, (on) => host.update(options(on)));
  else stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;

// A donut is a pie with an inner radius: cornerRadius rounds slices and radialText puts the total in the hole
import { defineChart, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc, radialText } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { budget } from '../../shared/marks2-budget.ts';
import { createStage } from '../../shared/stage.ts';

const total = budget.reduce((sum, b) => sum + b.amount, 0);
const slices = pie(budget, { value: 'amount', gapAngle: 0.03 });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The tooltip follows the visible slice shape, including rounded corners.' });
  let hole = 0.6;

  const build = () =>
    defineChart({
      marks: [
        polar({
          marks: [
            radialArc(slices, { key: 'name', color: 'name', innerRadius: ({ radius }) => radius * hole, cornerRadius: 6 }),
            // Text goes through the polar scales, so the container gets an identity-like pair of scales.
            radialText([{ label: `${total} total` }], { angle: () => 0, radius: () => 0, text: 'label', fontSize: 18, fontWeight: 700, baseline: 'middle' }),
          ],
          scales: {
            angle: { scale: scaleLinear().domain([0, 2 * Math.PI]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
        }),
      ],
      scales: { x: null, y: null },
      tooltip: {
      use: tooltip,
      format: (point) => ('fraction' in point.datum ? `${point.datum.name}: ${point.datum.value} (${(point.datum.fraction * 100).toFixed(1)}%)` : point.datum.label),
    },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Donut chart of a household budget' });
  const host = stage.own(mountChart(stage.box, options()));
  if (stage.bar) slider(stage.bar, 'hole', 0.2, 0.85, 0.05, hole, (x) => { hole = x; host.update(options()); }, (x) => `${Math.round(x * 100)}%`);
  else stage.ghost((t) => [0.5 + 0.3 * Math.cos(t * 6.28), 0.5 + 0.3 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;

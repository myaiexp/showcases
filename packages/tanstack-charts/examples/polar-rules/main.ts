// radialRule: pie leader lines and clock ticks, each one segment between two radii with pixel offsets
import { defineChart, mountChart } from '@tanstack/charts';
import { pie, polar, radialArc, radialRule, radialText } from '@tanstack/charts/polar';
import { scaleLinear } from 'd3-scale';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { budget } from '../../shared/marks2-budget.ts';
import { createStage } from '../../shared/stage.ts';

const slices = pie(budget, { value: 'amount', gapAngle: 0.02 });

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let reach = 18;

  const build = () =>
    defineChart({
      marks: [
        polar({
          // Offsets do not reserve space, so the radius is reduced to leave room for the labels.
          radiusRatio: 0.7,
          marks: [
            radialArc(slices, { key: 'name', color: 'name', innerRadius: ({ radius }) => radius * 0.45 }),
            radialRule(slices, { angle: 'angle', radius1: 1, radius2: 1, radius1Offset: 3, radius2Offset: 3 + reach, stroke: 'currentColor', strokeOpacity: 0.6 }),
            radialText(slices, { angle: 'angle', radius: 1, text: 'name', anchor: 'outside', radiusOffset: 8 + reach, fontSize: 12, baseline: 'middle' }),
          ],
          scales: {
            angle: { scale: scaleLinear().domain([0, 2 * Math.PI]) },
            radius: { scale: scaleLinear().domain([0, 1]) },
          },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Donut with leader lines' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`radius2Offset ${3 + reach}px: one rule per slice, from the outer edge to the label.`);
  };
  refresh();
  if (stage.bar) slider(stage.bar, 'leader length', 0, 40, 2, reach, (x) => { reach = x; refresh(); }, (x) => `${x}px`);
  else stage.cycle([18, 4, 30, 12], 1600, (x) => { reach = x; refresh(); });
  return () => stage.dispose();
};

export default mount;

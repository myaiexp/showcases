// tickLabels.rotate: rotated bounds and overhang feed the automatic bottom margin
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const rows = ['Account recovery', 'Saved searches', 'Audit log export', 'Retention policies', 'Access controls', 'Billing alerts'].map((label, i) => ({ id: label, label, value: [128, 95, 72, 44, 31, 58][i]! }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Rotate the labels and read the bottom margin.' });
  const build = (rotate: number) =>
    defineChart({
      marks: [barY(rows, { x: 'label', y: 'value', fill: '#fb923c' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2), axis: { tickLabels: { rotate } } }, y: { scale: scaleLinear, nice: true, grid: true } },
    });
  const options = (rotate: number) => ({
    definition: build(rotate),
    height: stage.height,
    ariaLabel: 'Requests per feature',
    onRender: ({ scene }: { scene: { margin: { bottom: number } } }) => stage.say(`rotate ${rotate} deg: bottom margin ${Math.round(scene.margin.bottom)}px`),
  });
  const host = stage.own(mountChart(stage.box, options(0)));
  if (stage.bar) slider(stage.bar, 'rotate', -90, 90, 5, 0, (v) => host.update(options(v)), (v) => `${v} deg`);
  else stage.cycle([0, -35, -90, 45], 1500, (v) => host.update(options(v)));
  return () => stage.dispose();
};

export default mount;

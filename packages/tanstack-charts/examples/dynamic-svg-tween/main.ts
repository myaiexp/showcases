// svgAnimation: true tweens keyed bars between data updates in the default SVG renderer
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button, checkbox } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press new data with the tween on and off.' });
  let animate = true;
  let step = 0;
  const build = () =>
    defineChart({
      svgAnimation: animate,
      marks: [barY(barStep(step), { x: 'label', y: 'value', key: 'id', fill: '#60a5fa' })],
      scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
    });
  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Six values that change' });
  const host = stage.own(mountChart(stage.box, options()));
  const next = (): void => {
    step++;
    host.update(options());
  };
  if (stage.bar) {
    checkbox(stage.bar, 'svgAnimation', true, (v) => { animate = v; });
    button(stage.bar, 'new data', next);
  } else {
    stage.every(1700, next);
    stage.say('svgAnimation: true');
  }
  return () => stage.dispose();
};

export default mount;

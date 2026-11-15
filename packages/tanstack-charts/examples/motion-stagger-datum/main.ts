// stagger({ each, offset }): one delay per datum index, spread into the chart motion policy
import { barY, defineChart } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { stagger } from '@tanstack/charts/motion/definition';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button, slider } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { replayer } from '../../shared/style-replay.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change each or offset, then replay the entrance.' });
  let each = 60;
  let offset = 0;
  const replay = replayer(stage, () =>
    mountChartRenderer(stage.box, {
      definition: defineChart({
        motion: { transition: { type: 'tween', duration: 500, easing: 'ease-out' }, ...stagger({ each, offset }) },
        marks: [barY(barStep(3, 10), { x: 'label', y: 'value', key: 'id', fill: '#fbbf24' })],
        scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
      }),
      renderer: motion(),
      height: stage.height,
      ariaLabel: 'Ten bars entering one after another',
    }),
  );
  replay();
  stage.say(`stagger({ each: ${each} })`);
  if (stage.bar) {
    slider(stage.bar, 'each', 0, 200, 10, each, (v) => { each = v; }, (v) => `${v} ms`);
    slider(stage.bar, 'offset', 0, 1000, 50, offset, (v) => { offset = v; }, (v) => `${v} ms`);
    button(stage.bar, 'replay', replay);
  } else stage.every(3200, replay);
  return () => stage.dispose();
};

export default mount;

// motion: false suppresses an inherited policy for its scope; a child can re-enable motion
import { barY, defineChart, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { barStep } from '../../shared/style-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Bars: motion false. Line: its own tween inside a chart that is off when the box is ticked.' });
  let step = 0;
  let chartOff = false;
  const options = () => {
    const rows = barStep(step);
    return {
      definition: defineChart({
        motion: chartOff ? false : { transition: { type: 'tween', duration: 900, easing: 'ease-in-out' } },
        marks: [
          barY(rows, { x: 'label', y: 'value', key: 'id', fill: '#475569', motion: false }),
          lineY(rows, { id: 'line', x: 'label', y: 'value', key: 'id', stroke: '#facc15', strokeWidth: 3, motion: { transition: { type: 'tween', duration: 900, easing: 'ease-in-out' } } }),
        ],
        scales: { x: { scale: () => scaleBand<string>().padding(0.2) }, y: { scale: () => scaleLinear().domain([0, 110]), grid: true } },
      }),
      renderer: motion(),
      height: stage.height,
      ariaLabel: 'Bars that snap and a line that glides',
    };
  };
  const host = stage.own(mountChartRenderer(stage.box, options()));
  stage.every(2200, () => {
    step++;
    host.update(options());
  });
  if (stage.bar) checkbox(stage.bar, 'chart: motion false', false, (v) => { chartOff = v; });
  else stage.say('bars: motion false, line: own tween');
  return () => stage.dispose();
};

export default mount;

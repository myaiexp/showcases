// The motion cascade: chart policy, mark override, axis and tick overrides
import { defineChart, dot, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { forecastRows } from '../../shared/style-forecast.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Line: spring. Dots: chart tween with their own duration. Tick labels: delayed 40 ms.' });
  let variant = 0;
  const options = () => {
    const rows = forecastRows(variant);
    return {
      definition: defineChart({
        motion: { transition: { type: 'tween', duration: 1400, easing: 'ease-in-out' } },
        marks: [
          lineY(rows, { id: 'forecast', x: 'month', y: 'forecast', key: 'id', stroke: '#fb923c', strokeWidth: 2.5, motion: { transition: { type: 'spring', stiffness: 150, damping: 12, mass: 1.25 } } }),
          dot(rows, { id: 'dots', x: 'month', y: 'forecast', key: 'id', r: 4, fill: '#fb923c', motion: { transition: { type: 'tween', duration: 600 } } }),
        ],
        scales: {
          x: { scale: scaleLinear, axis: { ticks: { motion: { transition: { type: 'tween', duration: 180 } } }, tickLabels: { motion: { delay: 40 } } } },
          y: { scale: () => scaleLinear().domain([30, 110]), grid: true },
        },
      }),
      renderer: motion(),
      height: stage.height,
      ariaLabel: 'Forecast revenue',
    };
  };
  const host = stage.own(mountChartRenderer(stage.box, options()));
  stage.every(2600, () => {
    variant++;
    host.update(options());
  });
  return () => stage.dispose();
};

export default mount;

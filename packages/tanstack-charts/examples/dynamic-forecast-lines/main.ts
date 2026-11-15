// Chart-level path morph with stagger, plus a heavier spring on one mark
import { defineChart, lineY } from '@tanstack/charts';
import { motion } from '@tanstack/charts/motion';
import { stagger } from '@tanstack/charts/motion/definition';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { forecastRows } from '../../shared/style-forecast.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press shift the curves and watch the forecast line trail the actual one.' });
  let variant = 0;
  const build = () => {
    const rows = forecastRows(variant);
    return defineChart({
      motion: { path: 'morph', ...stagger({ each: 35, roles: 'line', by: 'series' }) },
      marks: [
        lineY(rows, { id: 'actual', x: 'month', y: 'actual', key: 'id', stroke: '#60a5fa', strokeWidth: 2.5 }),
        lineY(rows, { id: 'forecast', x: 'month', y: 'forecast', key: 'id', stroke: '#fb923c', strokeWidth: 2.5, motion: { transition: { type: 'spring', mass: 1.25 } } }),
      ],
      scales: { x: { scale: scaleLinear }, y: { scale: scaleLinear().domain([20, 110]), grid: true } },
    });
  };
  const options = () => ({
    definition: build(),
    renderer: motion({ transition: { type: 'spring', stiffness: 170, damping: 18, mass: 1 } }),
    height: stage.height,
    ariaLabel: 'Actual and forecast revenue',
  });
  const host = stage.own(mountChartRenderer(stage.box, options()));
  const next = (): void => {
    variant++;
    host.update(options());
  };
  if (stage.bar) button(stage.bar, 'shift the curves', next);
  else stage.every(2200, next);
  return () => stage.dispose();
};

export default mount;

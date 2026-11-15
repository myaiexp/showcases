// linearRegressionY ci: band width follows the confidence level, 0 hides it
import { defineChart, dot, linearRegressionY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { noisyLines } from '../../shared/marks1-scatter.ts';
import { createStage } from '../../shared/stage.ts';

const rows = noisyLines({ a: [10, 0.8] }, 25, 6, 4);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const chart = (ci: number) =>
    defineChart({
      svgAnimation: true,
      marks: [dot(rows, { x: 'x', y: 'y', fillOpacity: 0.5 }), linearRegressionY(rows, { x: 'x', y: 'y', ci, fillOpacity: 0.2 })],
      scales: {
        x: { scale: scaleLinear, nice: true },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
    });

  const options = { definition: chart(0.95), height: stage.height, initialWidth: 640, ariaLabel: 'Fit with an adjustable confidence band' };
  const host = stage.own(mountChart(stage.box, options));
  const show = (ci: number): void => {
    host.update({ ...options, definition: chart(ci) });
    stage.say(`ci: ${ci}`);
  };

  if (stage.bar) {
    slider(stage.bar, 'ci', 0, 0.99, 0.01, 0.95, show);
    stage.say('ci: 0.95');
  } else stage.cycle([0, 0.5, 0.8, 0.95, 0.99], 1500, show);
  return () => stage.dispose();
};

export default mount;

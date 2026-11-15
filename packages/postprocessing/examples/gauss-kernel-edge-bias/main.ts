// GaussKernel edgeBias: how many edge coefficients of the Pascal row are cut off
import { GaussKernel } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { kernelOf } from '../../shared/kernel.ts';
import { chartPanel, drawBars, drawLabel, drawXTicks, plotArea } from '../../shared/utilities.ts';

const SIZE = 21;

const mount: Mount = (el, ctx) => {
  const panel = chartPanel(el, ctx);
  let bias = 4;

  const paint = (): void => {
    const base = kernelOf(new GaussKernel(SIZE, 0));
    const biased = kernelOf(new GaussKernel(SIZE, bias));
    const area = plotArea(panel, -0.8, 10.8, base.weights[0]! * 1.2, 36, 34);
    drawBars(panel, area, Array.from(base.weights, (value, x) => ({ x: x - 0.16, value })), '#6f7a90', 9);
    drawBars(panel, area, Array.from(biased.weights, (value, x) => ({ x: x + 0.16, value })), '#ffc93f', 9);
    drawXTicks(panel, area, 1);
    drawLabel(panel, `GaussKernel(${SIZE}, edgeBias)  weights, centre tap at 0`, 36, 14);
    drawLabel(panel, 'grey: edgeBias 0', 36, panel.height - 4, '#9aa3b5');
    drawLabel(panel, `gold: edgeBias ${bias}: outermost weight ${biased.weights.at(-1)!.toExponential(1)} vs ${base.weights.at(-1)!.toExponential(1)}`, 160, panel.height - 4, '#ffc93f');
  };
  panel.draw(paint);

  if (panel.bar) {
    slider(panel.bar, 'edgeBias', 0, 8, 1, bias, (v) => {
      bias = v;
      paint();
    });
  } else {
    let i = 0;
    panel.every(1300, () => {
      bias = [0, 2, 4, 6, 8][++i % 5]!;
      paint();
    });
  }
  return () => panel.dispose();
};

export default mount;

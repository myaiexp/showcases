// GaussKernel linear weights and offsets: two taps merged into one bilinear texture fetch
import { GaussKernel } from 'postprocessing';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { kernelOf } from '../../shared/kernel.ts';
import { chartPanel, drawBars, drawLabel, drawXTicks, plotArea } from '../../shared/utilities.ts';

const mount: Mount = (el, ctx) => {
  const panel = chartPanel(el, ctx);
  let size = 25;

  const paint = (): void => {
    const k = kernelOf(new GaussKernel(size, 2));
    const area = plotArea(panel, -0.5, 16.5, Math.max(...k.linearWeights) * 1.1, 36, 34);
    // Discrete taps sit on texel centres; linear taps sit between two texels and carry both weights.
    drawBars(panel, area, Array.from(k.weights, (value, i) => ({ x: k.offsets[i]!, value })), '#6f7a90', 8);
    drawBars(panel, area, Array.from(k.linearWeights, (value, i) => ({ x: k.linearOffsets[i]!, value })), '#ffc93f', 4);
    drawXTicks(panel, area, 1);
    drawLabel(panel, `kernelSize ${size}: ${k.steps} discrete taps (grey), ${k.linearSteps} linear fetches (gold)`, 36, 14);
    drawLabel(panel, 'x: offset from the centre in texels. Gold bars sit between texels.', 36, panel.height - 4, '#9aa3b5');
  };
  panel.draw(paint);

  if (panel.bar) {
    slider(panel.bar, 'kernelSize', 3, 31, 2, size, (v) => {
      size = v;
      paint();
    });
  } else {
    const sizes = [7, 15, 25, 31];
    let i = 0;
    panel.every(1500, () => {
      size = sizes[++i % sizes.length]!;
      paint();
    });
  }
  return () => panel.dispose();
};

export default mount;

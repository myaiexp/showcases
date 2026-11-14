// Axis sides and reverse: move the axes to the top and right, or flip the y direction
import { barX, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { products } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let flipped = false;
  let reverseX = false;

  const build = () =>
    defineChart({
      marks: [barX(products, { x: 'revenue', y: 'product', fill: '#60a5fa' })],
      scales: {
        x: { scale: scaleLinear, nice: true, grid: true, reverse: reverseX, side: flipped ? 'top' : 'bottom', axis: { label: 'Revenue' } },
        y: { scale: () => scaleBand<string>().padding(0.15), side: flipped ? 'right' : 'left' },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Revenue by product' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => host.update(options());
  if (stage.bar) {
    checkbox(stage.bar, 'axes on top and right', flipped, (v) => { flipped = v; refresh(); });
    checkbox(stage.bar, 'reverse x', reverseX, (v) => { reverseX = v; refresh(); });
  } else {
    stage.cycle([[false, false], [true, false], [true, true]] as const, 1700, ([f, r]) => { flipped = f; reverseX = r; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;

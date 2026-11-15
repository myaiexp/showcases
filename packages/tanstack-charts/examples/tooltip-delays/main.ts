// tooltip.showDelay and tooltip.hideDelay, adjustable with sliders
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { products } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Raise showDelay, then sweep across the bars quickly: nothing opens.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  let showDelay = stage.preview ? 700 : 0;
  let hideDelay = stage.preview ? 700 : 0;

  const options = () => ({
    definition: defineChart({
      marks: [barY(products, { x: 'product', y: 'revenue', key: 'id' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip: { use: tooltip, showDelay, hideDelay },
    }),
    height: stage.height,
    initialWidth: 640,
    ariaLabel: 'Revenue by product',
  });
  const host = stage.own(mountChart(stage.box, options()));

  if (stage.bar) {
    slider(stage.bar, 'showDelay', 0, 1000, 50, showDelay, (v) => { showDelay = v; host.update(options()); }, (v) => `${v} ms`);
    slider(stage.bar, 'hideDelay', 0, 1000, 50, hideDelay, (v) => { hideDelay = v; host.update(options()); }, (v) => `${v} ms`);
  } else {
    stage.say('showDelay 700 ms, hideDelay 700 ms');
    stage.ghost((t) => [0.1 + 0.8 * (t < 0.5 ? t * 2 : 2 - t * 2), 0.8], 9000);
  }
  return () => stage.dispose();
};

export default mount;

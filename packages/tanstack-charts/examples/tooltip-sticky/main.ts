// tooltip.sticky: pinning on by default, switched off with sticky: false
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { visit } from '../../shared/interact-drive.ts';
import { products } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a bar to pin its tooltip, click again or press Escape to release it.' });

  const build = (sticky: boolean) =>
    defineChart({
      marks: [barY(products, { x: 'product', y: 'revenue', key: 'id' })],
      scales: {
        x: { scale: () => scaleBand<string>().padding(0.25) },
        y: { scale: scaleLinear, nice: true, grid: true },
      },
      tooltip: { use: tooltip, sticky },
    });
  const options = (sticky: boolean) => ({ definition: build(sticky), height: stage.height, initialWidth: 640, ariaLabel: 'Revenue by product' });
  const host = stage.own(mountChart(stage.box, options(true)));

  if (stage.bar) checkbox(stage.bar, 'sticky', true, (v) => host.update(options(v)));
  else {
    const col = (i: number) => [0.1 + (0.85 * (i + 0.5)) / 6, 0.8] as const;
    visit(stage, [col(1), col(1), col(4), col(4)], 1500, { click: () => true });
  }
  return () => stage.dispose();
};

export default mount;

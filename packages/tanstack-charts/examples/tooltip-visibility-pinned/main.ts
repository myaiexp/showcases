// tooltip.visibility: 'pinned': focus ring on hover, tooltip only after a click
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { products } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hovering opens nothing; click a bar to open its tooltip.' });

  const definition = defineChart({
    marks: [barY(products, { x: 'product', y: 'revenue', key: 'id' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip: { use: tooltip, visibility: 'pinned' },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Revenue by product' }));
  if (stage.preview) {
    const col = (i: number) => [0.1 + (0.85 * (i + 0.5)) / 6, 0.8] as const;
    // Two hover-only steps, then a click that pins, then a click that releases.
    visit(stage, [col(0), col(2), col(3), col(3)], 1300, { click: (i) => i >= 2 });
  }
  return () => stage.dispose();
};

export default mount;

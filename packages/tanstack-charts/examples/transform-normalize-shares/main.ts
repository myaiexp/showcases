// normalize with basis 'sum' by quarter: revenue as a share of each quarter's total
import { barY, defineChart, mountChart, normalize } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { quarters } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a segment for its share.' });

  const shares = normalize(quarters, { by: 'quarter', value: 'revenue', basis: 'sum', as: 'share' });
  const definition = defineChart({
    marks: [barY(shares, { x: 'quarter', y: 'share', color: 'product' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Share of quarter revenue' } },
    },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Product shares per quarter' }));
  readoutPanel(stage)(tableText(shares, ['quarter', 'product', 'revenue', 'share'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

// Default tooltips on a stacked segment (its own value) and a floating bar (a range)
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { traffic } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const stacked = traffic.filter((r) => r.date.getUTCMonth() < 5);
const ranges = ['Jan', 'Feb', 'Mar', 'Apr', 'May'].map((month, i) => ({ month, low: 20 + i * 4, high: 48 + ((i * 11) % 17) + i * 3 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a segment: it reports its own size. Hover a floating bar: it reports a range.' });
  const x = { scale: () => scaleBand<string>().padding(0.25) };
  const y = { scale: scaleLinear, nice: true, grid: true };

  const stackedChart = defineChart({
    marks: [barY(stacked, { x: 'month', y: 'value', color: 'series', key: 'id' })],
    scales: { x, y },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition: stackedChart, height: stage.height, initialWidth: 420, ariaLabel: 'Stacked requests' }));

  if (!stage.preview) {
    const floating = defineChart({
      marks: [barY(ranges, { x: 'month', y1: 'low', y2: 'high', key: 'month' })],
      scales: { x, y },
      tooltip,
    });
    stage.own(mountChart(stage.addBox(), { definition: floating, height: stage.height, initialWidth: 420, ariaLabel: 'Floating range bars' }));
  } else stage.ghost((t) => [0.1 + 0.8 * t, 0.7]);
  return () => stage.dispose();
};

export default mount;

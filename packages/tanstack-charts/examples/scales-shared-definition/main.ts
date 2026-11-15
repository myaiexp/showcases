// One module-level definition mounted twice: each host copies the scales and assigns its own pixel range
import { areaY, defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scaleUtc } from '@tanstack/charts/scales/time';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { regionalSeries } from '../../shared/concepts-data.ts';
import { createStage } from '../../shared/stage.ts';

const rows = regionalSeries(4, 20).filter((r) => r.region === 'South');
const shared = defineChart({
  marks: [areaY(rows, { x: 'date', y: 'value', fillOpacity: 0.2 }), lineY(rows, { x: 'date', y: 'value', stroke: '#fb923c' })],
  scales: {
    x: { scale: scaleUtc },
    y: { scale: scaleLinear, nice: true, grid: true },
  },
  tooltip,
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both charts use the same definition object; their pixel ranges differ.' });
  const small = stage.addBox();
  small.style.maxWidth = '40%';

  stage.own(mountChart(stage.box, { definition: shared, height: stage.height, ariaLabel: 'Wide chart' }));
  stage.own(mountChart(small, { definition: shared, height: Math.round(stage.height * 0.6), ariaLabel: 'Small chart' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

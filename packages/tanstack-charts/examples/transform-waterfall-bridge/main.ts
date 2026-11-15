// waterfall: signed steps become floating bars with start, end and a kind
import { barY, defineChart, mountChart, waterfall } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { changes } from '../../shared/xform-data.ts';
import { createStage } from '../../shared/stage.ts';
import { readoutPanel, tableText } from '../../shared/xform-table.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar for its change and running level.' });

  const bridge = waterfall(changes, { value: 'change' });
  const definition = defineChart({
    marks: [barY(bridge, { x: (row) => (row.kind === 'total' ? 'Total' : row.step), y1: 'start', y2: 'end', color: 'kind' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true, axis: { label: 'Cash' } },
    },
    color: { domain: ['increase', 'decrease'], range: ['#4ade80', '#f87171'] },
    tooltip,
  });
  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Cash bridge' }));
  readoutPanel(stage)(tableText(bridge, ['step', 'change', 'delta', 'start', 'end', 'kind'], 6));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

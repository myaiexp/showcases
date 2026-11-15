// tooltip.format: one line of text built from point.datum and the pinned flag
import { defineChart, lineY, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { scalePoint } from '@tanstack/charts/scales/point';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the points, then click one to pin it.' });

  const definition = defineChart({
    marks: [lineY(weeks, { x: 'week', y: 'value', key: 'id', points: true })],
    scales: {
      x: { scale: () => scalePoint<string>().padding(0.2) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip: {
      use: tooltip,
      format(point, { pinned }) {
        const suffix = pinned ? ' · pinned' : '';
        return `${point.datum.week}: ${point.datum.value.toLocaleString()} users${suffix}`;
      },
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly users' }));
  if (stage.preview) {
    const col = (i: number) => [0.08 + (0.84 * (i + 0.5)) / 8, 0.5] as const;
    visit(stage, [col(1), col(3), col(3), col(6)], 1400, { click: (i) => i === 2 });
  }
  return () => stage.dispose();
};

export default mount;

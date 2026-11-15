// Item text callbacks get { pinned }: extra rows appear only after click or Enter
import { barY, defineChart, mountChart } from '@tanstack/charts';
import { scaleBand } from '@tanstack/charts/scales/band';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { weeks } from '../../shared/interact-data.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a bar, then click it: the tooltip pins and shows a second row.' });

  const definition = defineChart({
    marks: [barY(weeks, { x: 'week', y: 'value', key: 'id' })],
    scales: {
      x: { scale: () => scaleBand<string>().padding(0.25) },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    tooltip: {
      use: tooltip,
      items: [
        { channel: 'y', label: 'Users' },
        { id: 'detail', label: 'Detail', text: (point, { pinned }) => (pinned ? `${point.datum.status}, ${Math.round(point.datum.change * 100)}% on last week` : null) },
      ],
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, initialWidth: 640, ariaLabel: 'Weekly users' }));
  if (stage.preview) {
    const col = (i: number) => [0.1 + (0.85 * (i + 0.5)) / 8, 0.8] as const;
    visit(stage, [col(2), col(2), col(5), col(5)], 1500, { click: () => true });
  }
  return () => stage.dispose();
};

export default mount;

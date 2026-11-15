// onSelect: the point that was activated, or null for a click away from every point
import { defineChart, dot, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { visit } from '../../shared/interact-drive.ts';
import { scatter } from '../../shared/interact-data.ts';
import { reader } from '../../shared/interact-read.ts';
import { createStage } from '../../shared/stage.ts';

const rows = scatter(12, 21);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Click a dot, or Tab to the chart and press Enter; click empty space to get null.' });
  if (stage.preview) stage.height -= 22; // leaves room for the caption lines under the chart
  const show = reader(stage);
  const log: string[] = [];
  show('onSelect: (nothing yet)');

  const definition = defineChart({
    marks: [dot(rows, { x: 'x', y: 'y', key: 'id', r: 6, color: 'group' })],
    scales: {
      x: { scale: scaleLinear, nice: true },
      y: { scale: scaleLinear, nice: true, grid: true },
    },
    maxFocusDistance: 20,
    tooltip,
  });

  const host = stage.own(
    mountChart(stage.box, {
      definition,
      height: stage.height,
      initialWidth: 640,
      ariaLabel: 'Scatter of 12 points',
      onSelect: (point) => {
        log.unshift(point ? `${point.datum.id} (group ${point.datum.group}) at ${point.datum.x}, ${point.datum.y}` : 'null');
        show(`onSelect: ${stage.preview ? log[0] : log.slice(0, 5).join('\n          ')}`);
      },
    }),
  );
  if (stage.preview) {
    // The card aims at points through the scene, so it needs their pixel positions first.
    stage.after(600, () => {
      const scene = host.getScene();
      const at = (i: number) => [scene.points[i]!.x / scene.width, scene.points[i]!.y / scene.height] as const;
      visit(stage, [at(0), [0.5, 0.02], at(5), [0.97, 0.97]], 1300, { click: () => true });
    });
  }
  return () => stage.dispose();
};

export default mount;

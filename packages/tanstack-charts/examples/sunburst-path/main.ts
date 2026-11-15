// sunburst from path rows inside polar: nested rings, one per hierarchy depth
import { defineChart, mountChart } from '@tanstack/charts';
import { sunburst } from '@tanstack/charts/hierarchy/sunburst';
import { polar } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The inner ring is the folders, the outer ring their files.' });

  const definition = defineChart({
    marks: [
      polar({
        marks: [sunburst(files, { path: 'name', delimiter: '.', value: 'size', color: 'branchId', stroke: '#111', strokeWidth: 1 })],
        // The sunburst sets its own angles and radii, so the polar scales are switched off.
        scales: { angle: null, radius: null },
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}\n${point.datum.id}\nsize ${point.datum.value}, ring ${point.datum.depth}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sunburst of source file sizes' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.35 * Math.cos(t * 6.28), 0.5 + 0.35 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;

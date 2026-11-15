// sunburst from parent references: nodeId and parentId, with a hole in the middle
import { defineChart, mountChart } from '@tanstack/charts';
import { sunburst } from '@tanstack/charts/hierarchy/sunburst';
import { polar } from '@tanstack/charts/polar';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { sourceNodes } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const nodes = sourceNodes();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Explicit ids: the tooltip shows each node with its full id.' });

  const definition = defineChart({
    marks: [
      polar({
        marks: [
          sunburst(nodes, {
            id: 'package-sunburst',
            nodeId: 'id',
            parentId: 'parentId',
            value: 'size',
            innerRadius: ({ radius }) => radius * 0.2,
            color: 'branchId',
            stroke: '#111',
          }),
        ],
        scales: { angle: null, radius: null },
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}\n${point.datum.id}\nsize ${point.datum.value}, ring ${point.datum.depth}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Sunburst built from parent references' }));
  if (stage.preview) stage.ghost((t) => [0.5 + 0.35 * Math.cos(t * 6.28), 0.5 + 0.35 * Math.sin(t * 6.28)]);
  return () => stage.dispose();
};

export default mount;

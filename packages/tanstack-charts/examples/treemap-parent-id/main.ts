// treemap from explicit parent references: nodeId and parentId instead of a path string
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { sourceNodes } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const nodes = sourceNodes();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same tree as the path example, built from id and parentId columns.' });

  const definition = defineChart({
    marks: [
      treemap(nodes, {
        // `id` names the mark, so the node identity column is called nodeId.
        id: 'source-sizes',
        nodeId: 'id',
        parentId: 'parentId',
        value: 'size',
        color: (node) => node.ancestorIds[1] ?? node.id,
        label: 'name',
        inset: 1,
        radius: 3,
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}\n${point.datum.id}\nsize ${point.datum.value}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Treemap built from parent references' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

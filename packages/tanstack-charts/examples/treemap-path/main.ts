// treemap from path rows: "app.core.scene" style names become a hierarchy of nested groups
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each rectangle is a file; area is its size and color is its folder.' });

  const definition = defineChart({
    marks: [
      treemap(files, {
        path: 'name',
        delimiter: '.',
        value: 'size',
        // ancestorIds runs from the root down, so index 1 is the top-level folder.
        color: (node) => node.ancestorIds[1] ?? node.id,
        label: 'name',
        inset: 1,
      }),
    ],
    scales: { x: null, y: null },
    tooltip: {
      use: tooltip,
      format: (point) => `${point.datum.name}\n${point.datum.id}\nsize ${point.datum.value}`,
    },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Treemap of source file sizes' }));
  if (stage.preview) stage.ghost();
  return () => stage.dispose();
};

export default mount;

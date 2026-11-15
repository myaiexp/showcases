// treemap states: focusing one tile dims every tile outside its folder, using node lineage
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import type { Mount } from '@/types.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a tile: the rest of its folder stays bright, other folders fade.' });

  const definition = defineChart({
    marks: [
      treemap(files, {
        path: 'name',
        delimiter: '.',
        value: 'size',
        color: (node) => node.ancestorIds[1] ?? node.id,
        label: 'name',
        inset: 1,
        states: [
          {
            // The same folder as the focused tile: compare the second ancestor id.
            when: ({ datum, focus }) => datum.ancestorIds[1] !== focus.primary.datum.ancestorIds[1],
            style: { fillOpacity: 0.25 },
            transition: { type: 'tween', duration: 150 },
          },
          { when: { focus: 'primary' }, style: { stroke: 'currentColor', strokeWidth: 2 } },
        ],
      }),
    ],
    scales: { x: null, y: null },
  });

  stage.own(mountChart(stage.box, { definition, height: stage.height, ariaLabel: 'Treemap with folder highlighting' }));
  if (stage.preview) stage.ghost((t) => [0.1 + 0.8 * t, 0.2 + 0.6 * Math.abs(Math.sin(t * 6))]);
  return () => stage.dispose();
};

export default mount;

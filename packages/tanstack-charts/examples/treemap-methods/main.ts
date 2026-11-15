// treemap method: squarify, binary, dice, slice and slice-dice tile the same data differently
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap, type TreemapMethod } from '@tanstack/charts/hierarchy/treemap';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();
const methods: readonly TreemapMethod[] = ['squarify', 'binary', 'dice', 'slice', 'slice-dice'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (method: TreemapMethod) =>
    defineChart({
      svgAnimation: true,
      marks: [
        treemap(files, {
          path: 'name',
          delimiter: '.',
          value: 'size',
          method,
          color: (node) => node.ancestorIds[1] ?? node.id,
          label: 'name',
          inset: 1,
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = (method: TreemapMethod) => ({ definition: build(method), height: stage.height, ariaLabel: 'Treemap tiling methods' });
  const host = stage.own(mountChart(stage.box, options('squarify')));
  const show = (method: TreemapMethod): void => {
    host.update(options(method));
    stage.say(`method: '${method}'`);
  };
  if (stage.bar) select(stage.bar, 'method', methods.map((m) => [m, m] as const), show);
  else stage.cycle(methods, 1800, show);
  return () => stage.dispose();
};

export default mount;

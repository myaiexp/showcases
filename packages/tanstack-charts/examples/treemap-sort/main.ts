// treemap sort: a comparator over sibling nodes orders tiles by size instead of source order
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap, type TreemapNodeComparator } from '@tanstack/charts/hierarchy/treemap';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { sourceFiles, type FileRow } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();
type Order = 'authored' | 'largest' | 'smallest';
const comparators: Record<Order, TreemapNodeComparator<FileRow> | undefined> = {
  authored: undefined,
  largest: (a, b) => b.value - a.value,
  smallest: (a, b) => a.value - b.value,
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (order: Order) => {
    const sort = comparators[order];
    return defineChart({
      svgAnimation: true,
      marks: [
        treemap(files, {
          path: 'name',
          delimiter: '.',
          value: 'size',
          ...(sort ? { sort } : {}),
          color: (node) => node.ancestorIds[1] ?? node.id,
          label: 'name',
          inset: 1,
        }),
      ],
      scales: { x: null, y: null },
    });
  };

  const options = (order: Order) => ({ definition: build(order), height: stage.height, ariaLabel: 'Treemap sibling order' });
  const host = stage.own(mountChart(stage.box, options('authored')));
  const show = (order: Order): void => {
    host.update(options(order));
    stage.say(order === 'authored' ? 'No sort: siblings keep their authored order.' : `sort: siblings by ${order} value first.`);
  };
  if (stage.bar) select(stage.bar, 'sibling order', [['authored', 'authored'], ['largest', 'largest first'], ['smallest', 'smallest first']] as const, show);
  else stage.cycle(['authored', 'largest', 'smallest'] as const, 1800, show);
  return () => stage.dispose();
};

export default mount;

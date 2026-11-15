// treemap ratio and round: the squarify aspect ratio target, and whole-pixel rectangle edges
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import type { Mount } from '@/types.ts';
import { checkbox, slider } from '../../shared/controls.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { ratio: 1.618, round: false };

  const build = () =>
    defineChart({
      svgAnimation: true,
      marks: [
        treemap(files, {
          path: 'name',
          delimiter: '.',
          value: 'size',
          ratio: v.ratio,
          round: v.round,
          paddingInner: 1,
          color: (node) => node.ancestorIds[1] ?? node.id,
          label: 'name',
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Treemap squarify ratio' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`ratio ${v.ratio.toFixed(2)}: higher values allow wider, flatter tiles.`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'ratio', 1, 6, 0.1, v.ratio, (x) => { v.ratio = x; refresh(); }, (x) => x.toFixed(1));
    checkbox(stage.bar, 'round', v.round, (x) => { v.round = x; refresh(); });
  } else {
    stage.cycle([1, 1.618, 3, 6], 1700, (r) => { v.ratio = r; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;

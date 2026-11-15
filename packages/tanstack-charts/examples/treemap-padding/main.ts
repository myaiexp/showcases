// treemap paddingInner, paddingOuter, inset and radius: the four spacing options side by side
import { defineChart, mountChart } from '@tanstack/charts';
import { treemap } from '@tanstack/charts/hierarchy/treemap';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { inner: 2, outer: 6, inset: 0, radius: 4 };

  const build = () =>
    defineChart({
      marks: [
        treemap(files, {
          path: 'name',
          delimiter: '.',
          value: 'size',
          paddingInner: v.inner,
          paddingOuter: v.outer,
          inset: v.inset,
          radius: v.radius,
          color: (node) => node.ancestorIds[1] ?? node.id,
          label: 'name',
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Treemap spacing options' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`paddingInner ${v.inner}, paddingOuter ${v.outer}, inset ${v.inset}, radius ${v.radius}`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'paddingInner', 0, 12, 1, v.inner, (x) => { v.inner = x; refresh(); });
    slider(stage.bar, 'paddingOuter', 0, 20, 1, v.outer, (x) => { v.outer = x; refresh(); });
    slider(stage.bar, 'inset', 0, 8, 0.5, v.inset, (x) => { v.inset = x; refresh(); });
    slider(stage.bar, 'radius', 0, 16, 1, v.radius, (x) => { v.radius = x; refresh(); });
  } else {
    stage.cycle([[2, 6, 0, 4], [8, 14, 2, 8], [0, 0, 0, 0], [4, 0, 1, 12]] as const, 1600, ([i, o, n, r]) => { Object.assign(v, { inner: i, outer: o, inset: n, radius: r }); refresh(); });
  }
  return () => stage.dispose();
};

export default mount;

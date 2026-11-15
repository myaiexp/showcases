// sunburst ring options: innerRadius, outerRadius, ringPadding and visibleDepth
import { defineChart, mountChart } from '@tanstack/charts';
import { sunburst } from '@tanstack/charts/hierarchy/sunburst';
import { polar } from '@tanstack/charts/polar';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { deepFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = deepFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { inner: 0.15, outer: 1, gap: 2, depth: 3 };

  const build = () =>
    defineChart({
      marks: [
        polar({
          marks: [
            sunburst(files, {
              path: 'name',
              delimiter: '.',
              value: 'size',
              visibleDepth: v.depth,
              innerRadius: ({ radius }) => radius * v.inner,
              outerRadius: ({ radius }) => radius * v.outer,
              ringPadding: v.gap,
              color: 'branchId',
            }),
          ],
          scales: { angle: null, radius: null },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Sunburst ring options' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`visibleDepth ${v.depth}, ringPadding ${v.gap}px, radii ${Math.round(v.inner * 100)}% to ${Math.round(v.outer * 100)}%`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'visibleDepth', 1, 4, 1, v.depth, (x) => { v.depth = x; refresh(); });
    slider(stage.bar, 'innerRadius', 0, 0.6, 0.05, v.inner, (x) => { v.inner = x; refresh(); }, (x) => `${Math.round(x * 100)}%`);
    slider(stage.bar, 'outerRadius', 0.5, 1, 0.05, v.outer, (x) => { v.outer = x; refresh(); }, (x) => `${Math.round(x * 100)}%`);
    slider(stage.bar, 'ringPadding', 0, 10, 1, v.gap, (x) => { v.gap = x; refresh(); }, (x) => `${x}px`);
  } else {
    stage.cycle([[3, 0.15, 1, 2], [2, 0.3, 0.9, 6], [4, 0, 1, 0], [1, 0.4, 0.8, 4]] as const, 1700, ([d, i, o, g]) => { Object.assign(v, { depth: d, inner: i, outer: o, gap: g }); refresh(); });
  }
  return () => stage.dispose();
};

export default mount;

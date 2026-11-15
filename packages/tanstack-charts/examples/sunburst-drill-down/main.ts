// sunburst rootId: rebuilding the definition with a new root animates a drill-down with motion()
import { defineChart } from '@tanstack/charts';
import { sunburst } from '@tanstack/charts/hierarchy/sunburst';
import { motion } from '@tanstack/charts/motion';
import { polar } from '@tanstack/charts/polar';
import { mountChartRenderer } from '@tanstack/charts/renderer';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { deepFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = deepFiles();
const roots = ['/app', '/app/core', '/app/marks', '/app/spatial', '/app/core/marks'] as const;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (rootId: string) =>
    defineChart({
      marks: [
        polar({
          marks: [
            sunburst(files, {
              id: 'package-sunburst',
              path: 'name',
              delimiter: '.',
              value: 'size',
              rootId,
              visibleDepth: 2,
              innerRadius: ({ radius }) => radius * 0.18,
              ringPadding: 1,
              color: 'branchId',
              stroke: '#111',
            }),
          ],
          scales: { angle: null, radius: null },
        }),
      ],
      scales: { x: null, y: null },
      motion: { transition: { type: 'tween', duration: 720, easing: 'ease-in-out' } },
    });

  const options = (rootId: string) => ({ definition: build(rootId), renderer: motion(), height: stage.height, initialWidth: 480, ariaLabel: 'Sunburst drill-down' });
  const host = stage.own(mountChartRenderer(stage.box, options(roots[0])));
  const show = (rootId: string): void => {
    host.update(options(rootId));
    stage.say(`rootId: '${rootId}', visibleDepth: 2`);
  };
  if (stage.bar) select(stage.bar, 'rootId', roots.map((r) => [r, r] as const), show);
  else stage.cycle(['/app', '/app/core', '/app', '/app/marks'], 2200, show);
  return () => stage.dispose();
};

export default mount;

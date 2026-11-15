// sunburst color: branchId gives each top-level branch one color, node depth gives one color per ring
import { defineChart, mountChart } from '@tanstack/charts';
import { sunburst } from '@tanstack/charts/hierarchy/sunburst';
import { polar } from '@tanstack/charts/polar';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { deepFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = deepFiles();
type Mode = 'branch' | 'depth' | 'leaf';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);

  const build = (mode: Mode) =>
    defineChart({
      svgAnimation: true,
      marks: [
        polar({
          marks: [
            sunburst(files, {
              path: 'name',
              delimiter: '.',
              value: 'size',
              ringPadding: 1,
              stroke: '#111',
              color: mode === 'branch' ? 'branchId' : mode === 'depth' ? (node) => `depth ${node.depth}` : (node) => (node.external ? 'file' : 'folder'),
            }),
          ],
          scales: { angle: null, radius: null },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = (mode: Mode) => ({ definition: build(mode), height: stage.height, ariaLabel: 'Sunburst color modes' });
  const host = stage.own(mountChart(stage.box, options('branch')));
  const show = (mode: Mode): void => {
    host.update(options(mode));
    stage.say(mode === 'branch' ? "color: 'branchId' (each branch keeps one color)" : mode === 'depth' ? 'color: node depth' : 'color: node.external (leaf or not)');
  };
  if (stage.bar) select(stage.bar, 'color by', [['branch', 'branchId'], ['depth', 'depth'], ['leaf', 'leaf or folder']] as const, show);
  else stage.cycle(['branch', 'depth', 'leaf'] as const, 1800, show);
  return () => stage.dispose();
};

export default mount;

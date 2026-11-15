// sunburst in a half circle: the polar startAngle and endAngle set the sweep the sunburst divides
import { defineChart, mountChart } from '@tanstack/charts';
import { sunburst } from '@tanstack/charts/hierarchy/sunburst';
import { polar } from '@tanstack/charts/polar';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { sourceFiles } from '../../shared/marks2-tree.ts';
import { createStage } from '../../shared/stage.ts';

const files = sourceFiles();

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  let degrees = 180;

  const build = () =>
    defineChart({
      marks: [
        polar({
          // Angle zero is twelve o'clock; the sweep starts at nine o'clock and runs clockwise.
          startAngle: -Math.PI / 2,
          endAngle: -Math.PI / 2 + (degrees * Math.PI) / 180,
          marks: [sunburst(files, { path: 'name', delimiter: '.', value: 'size', innerRadius: ({ radius }) => radius * 0.25, ringPadding: 1, color: 'branchId' })],
          scales: { angle: null, radius: null },
        }),
      ],
      scales: { x: null, y: null },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Sunburst over a partial sweep' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`polar sweep: ${Math.round(degrees)} degrees`);
  };
  refresh();
  if (stage.bar) slider(stage.bar, 'sweep', 90, 360, 15, degrees, (x) => { degrees = x; refresh(); }, (x) => `${x} deg`);
  else stage.cycle([180, 270, 360, 120], 1800, (d) => { degrees = d; refresh(); });
  return () => stage.dispose();
};

export default mount;

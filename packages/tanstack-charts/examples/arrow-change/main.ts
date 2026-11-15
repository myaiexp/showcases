// arrow: a directed segment with a fixed-pixel head, from last year's position to this year's
import { arrow, defineChart, mountChart } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import { tooltip } from '@tanstack/charts/tooltip';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { normal, rng } from '../../shared/random.ts';
import { createStage } from '../../shared/stage.ts';

const random = rng(21);
const jitter = normal(random, 0, 7);
const rows = Array.from({ length: 22 }, (_, i) => {
  const x1 = 15 + random() * 70;
  const y1 = 15 + random() * 70;
  return { id: i, x1, y1, x2: x1 + jitter() + 5, y2: y1 + jitter() };
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover an arrow: the focus point is its head.' });
  const v = { length: 10, angle: 28 };

  const build = () =>
    defineChart({
      marks: [
        arrow(rows, {
          x1: 'x1',
          y1: 'y1',
          x2: 'x2',
          y2: 'y2',
          key: 'id',
          color: (r) => (r.y2 >= r.y1 ? 'up' : 'down'),
          strokeWidth: 2,
          headLength: v.length,
          headAngle: v.angle,
        }),
      ],
      scales: {
        x: { scale: scaleLinear().domain([0, 100]), grid: true, axis: { label: 'Cost' } },
        y: { scale: scaleLinear().domain([0, 100]), grid: true, axis: { label: 'Quality' } },
      },
      tooltip,
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Arrows from last year to this year' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`headLength ${v.length}px, headAngle ${v.angle} degrees. The head keeps its pixel size when the chart resizes.`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'headLength', 0, 24, 1, v.length, (x) => { v.length = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'headAngle', 10, 60, 2, v.angle, (x) => { v.angle = x; refresh(); }, (x) => `${x} deg`);
  } else {
    stage.cycle([[10, 28], [16, 20], [6, 45], [12, 30]] as const, 1700, ([l, a]) => { v.length = l; v.angle = a; refresh(); });
    stage.ghost();
  }
  return () => stage.dispose();
};

export default mount;

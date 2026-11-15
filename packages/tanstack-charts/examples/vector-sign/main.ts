// vector with constants: a fixed length and rotation, and a negative length that reverses the body
import { defineChart, dot, mountChart, vector } from '@tanstack/charts';
import { scaleLinear } from '@tanstack/charts/scales/linear';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const points = Array.from({ length: 28 }, (_, i) => ({ id: i, x: (i % 7) + 1, y: Math.floor(i / 7) + 1 }));

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const v = { length: 26, rotate: 45 };

  const build = () =>
    defineChart({
      marks: [
        dot(points, { x: 'x', y: 'y', key: 'id', r: 2, fill: '#e5e7eb' }),
        vector(points, { x: 'x', y: 'y', key: 'id', length: v.length, rotate: v.rotate, anchor: 'start', stroke: '#60a5fa', headLength: 6 }),
      ],
      scales: {
        x: { scale: scaleLinear().domain([0, 8]) },
        y: { scale: scaleLinear().domain([0, 5]) },
      },
    });

  const options = () => ({ definition: build(), height: stage.height, ariaLabel: 'Vectors with constant length and rotation' });
  const host = stage.own(mountChart(stage.box, options()));
  const refresh = (): void => {
    host.update(options());
    stage.say(`length ${v.length}px, rotate ${v.rotate} degrees. A negative length points the other way.`);
  };
  refresh();
  if (stage.bar) {
    slider(stage.bar, 'length', -40, 40, 2, v.length, (x) => { v.length = x; refresh(); }, (x) => `${x}px`);
    slider(stage.bar, 'rotate', 0, 360, 15, v.rotate, (x) => { v.rotate = x; refresh(); }, (x) => `${x} deg`);
  } else {
    stage.cycle([[26, 45], [26, 135], [-26, 45], [14, 300]] as const, 1600, ([l, r]) => { v.length = l; v.rotate = r; refresh(); });
  }
  return () => stage.dispose();
};

export default mount;

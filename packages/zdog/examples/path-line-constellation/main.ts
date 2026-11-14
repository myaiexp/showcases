// Constellation lines: a path with z coordinates joins stars that sit at different depths
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, slider } from '../../shared/controls.ts';

// the seven stars of a ladle shape: x, y, z
const STARS: [number, number, number][] = [
  [-100, -30, 40],
  [-62, -10, -10],
  [-30, 4, -50],
  [4, 20, -20],
  [14, 62, 30],
  [66, 54, 60],
  [74, 8, 10],
];
const DUST: [number, number, number][] = [
  [-90, 60, -40], [-40, -70, 30], [30, -60, -60], [90, -40, 50], [-10, 90, 70],
  [100, 80, -30], [-110, 20, -70], [50, -10, 80], [-60, 80, 40], [10, -90, 0],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the sky. Stars are not on one flat plane.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { y: -0.5 },
    dragRotate: true,
  });
  const sky = new Zdog.Anchor({ addTo: illo });
  let depth = 1;
  let lines = true;
  let line: Zdog.Shape | null = null;
  const dots: Zdog.Shape[] = [];

  for (const [x, y, z] of DUST) {
    new Zdog.Shape({ addTo: sky, stroke: 3, color: '#8a8fc2', translate: { x, y, z } });
  }
  for (const [x, y, z] of STARS) {
    dots.push(new Zdog.Shape({ addTo: sky, stroke: 11, color: '#FDB', translate: { x, y, z } }));
  }

  const draw = (): void => {
    line?.remove();
    line = null;
    for (const [i, d] of dots.entries()) d.translate.z = STARS[i]![2] * depth;
    if (!lines) return;
    // every path point carries its own z, so the line runs through the sky
    line = new Zdog.Shape({
      addTo: sky,
      path: STARS.map(([x, y, z]) => ({ x, y, z: z * depth })),
      closed: false,
      stroke: 2,
      color: '#EA0',
    });
  };
  draw();

  if (stage.bar) {
    slider(stage.bar, 'depth', 0, 2, 0.05, depth, (v) => { depth = v; draw(); }, (v) => `×${v.toFixed(2)}`);
    checkbox(stage.bar, 'join with lines', lines, (v) => { lines = v; draw(); });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      sky.rotate.y = t * 0.5;
      depth = 1 + Math.sin(t * 1.2) * 0.8;
      draw();
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

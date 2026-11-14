// Snowman dots: a Shape with no path is a point, and stroke makes the point a ball
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn the snowman.' });
  let spinning = true;
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.15,
    rotate: { x: -0.15 },
    dragRotate: true,
    onDragStart: () => {
      spinning = false;
    },
  });
  const snowman = new Zdog.Anchor({ addTo: illo, translate: { y: -4 } });

  // no path: each of these is one point, drawn as a ball as wide as its stroke
  const base = new Zdog.Shape({ addTo: snowman, stroke: 84, color: '#fff', translate: { y: 52 } });
  const belly = new Zdog.Shape({ addTo: snowman, stroke: 62, color: '#fff', translate: { y: -6 } });
  const head = new Zdog.Shape({ addTo: snowman, stroke: 44, color: '#fff', translate: { y: -48 } });

  // coal: tiny dots pressed into the front of the snow
  for (const x of [-8, 8]) {
    new Zdog.Shape({ addTo: snowman, stroke: 6, color: '#222', translate: { x, y: -55, z: 19 } });
  }
  for (const y of [-18, -4, 10]) {
    new Zdog.Shape({ addTo: snowman, stroke: 7, color: '#222', translate: { y, z: 29 } });
  }
  // carrot: a path of two points makes a line
  new Zdog.Shape({
    addTo: snowman,
    path: [{ z: 18 }, { z: 42 }],
    translate: { y: -47 },
    stroke: 9,
    color: '#E62',
  });
  // twig arms
  for (const s of [-1, 1]) {
    new Zdog.Shape({
      addTo: snowman,
      path: [{ x: 26 * s, y: -12 }, { x: 62 * s, y: -34 }, { x: 78 * s, y: -30 }],
      closed: false,
      stroke: 4,
      color: '#C86',
    });
  }

  // one slider to see that size is all stroke
  const setSize = (k: number): void => {
    base.stroke = 84 * k;
    belly.stroke = 62 * k;
    head.stroke = 44 * k;
  };
  if (stage.bar) slider(stage.bar, 'stroke', 0.5, 1.2, 0.01, 1, setSize, (v) => `×${v.toFixed(2)}`);

  stage.loop((_dt, t) => {
    if (stage.preview) {
      illo.rotate.y = Math.sin(t * 0.9) * 0.7;
      setSize(1 + Math.sin(t * 1.8) * 0.06);
    } else if (spinning) {
      illo.rotate.y += 0.008;
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

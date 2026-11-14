// Folding box: six Rects, each turned to face a direction, fold from a flat net into a cube
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const S = 90; // edge of the cube
const TAU = Zdog.TAU;
const SIDES = ['#EA0', '#E62', '#FDB', '#C25'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look around the box.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 0.85,
    rotate: { x: -0.7, y: -0.5 },
    dragRotate: true,
  });
  const box = new Zdog.Anchor({ addTo: illo, translate: { y: 24 } });
  const rect = (addTo: Zdog.Anchor, color: string): Zdog.Rect =>
    // a Rect faces front; rotating it by a quarter turn about x lays it flat on the floor
    new Zdog.Rect({ addTo, width: S, height: S, stroke: 2, fill: true, color, translate: { z: S / 2 }, rotate: { x: TAU / 4 } });

  // the base lies flat; each side hangs off one edge of it
  new Zdog.Rect({ addTo: box, width: S, height: S, stroke: 2, fill: true, color: '#a35ac9', rotate: { x: TAU / 4 } });
  const hinges: Zdog.Anchor[] = [];
  let lidHinge: Zdog.Anchor | null = null;
  SIDES.forEach((color, i) => {
    // turn to face one of four directions, then move out to that edge
    const side = new Zdog.Anchor({ addTo: box, rotate: { y: (i * TAU) / 4 } });
    const hinge = new Zdog.Anchor({ addTo: side, translate: { z: S / 2 } });
    rect(hinge, color);
    hinges.push(hinge);
    if (i === 0) {
      // the lid hangs off the far edge of the first flap
      lidHinge = new Zdog.Anchor({ addTo: hinge, translate: { z: S } });
      rect(lidHinge, '#ED0');
    }
  });

  let fold = 0.55;
  const apply = (): void => {
    const sides = Math.min(fold * 2, 1);
    const lid = Math.max(0, fold * 2 - 1);
    for (const h of hinges) h.rotate.x = sides * (TAU / 4);
    if (lidHinge) lidHinge.rotate.x = lid * (TAU / 4);
  };
  apply();

  if (stage.bar) {
    slider(stage.bar, 'fold', 0, 1, 0.01, fold, (v) => { fold = v; apply(); }, (v) => `${Math.round(v * 100)}%`);
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      // ping-pong between flat and closed, easing at both ends
      const a = (t / 3.2) % 2;
      fold = Zdog.easeInOut(a < 1 ? a : 2 - a, 3);
      apply();
      illo.rotate.y = -0.5 + t * 0.4;
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

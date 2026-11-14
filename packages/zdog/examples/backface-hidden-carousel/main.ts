// Hidden-backface carousel: a ring of one-sided signs, only the near fronts draw
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

const COLORS = ['#E62', '#EA0', '#C25', '#a35ac9', '#ED0', '#2dd4a7', '#5aa8ff', '#fff'];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to tilt the ring. Untick the box to draw the signs from behind as well.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.15,
    rotate: { x: -0.45 },
    dragRotate: !stage.preview,
  });

  // a gold ball in the middle, visible through the gap behind the near signs
  new Zdog.Shape({ addTo: illo, stroke: 46, color: '#EA0' });

  const ring = new Zdog.Anchor({ addTo: illo });
  const panels: Zdog.Rect[] = [];
  COLORS.forEach((color, i) => {
    // each panel gets its own turned anchor, then slides out along z so its front faces outward
    const spoke = new Zdog.Anchor({ addTo: ring, rotate: { y: (i / COLORS.length) * Zdog.TAU } });
    panels.push(new Zdog.Rect({
      addTo: spoke, width: 62, height: 90, translate: { z: 100 }, stroke: 6, fill: true, color,
      backface: false,
    }));
  });

  const setBackface = (hidden: boolean): void => {
    for (const p of panels) p.backface = hidden ? false : '#333';
  };
  if (stage.bar) checkbox(stage.bar, 'backface: false', true, setBackface);
  else {
    let hidden = true;
    stage.every(3000, () => { hidden = !hidden; setBackface(hidden); });
  }

  stage.loop((dt) => {
    ring.rotate.y += dt * 0.7;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

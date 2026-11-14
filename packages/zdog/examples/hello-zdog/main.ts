// Hello Zdog: a circle and a square placed in 3D space, spinning until you grab them
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to rotate. Spinning stops when you grab it.' });
  let isSpinning = true;

  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    dragRotate: true,
    // stop spinning when drag starts
    onDragStart: () => {
      isSpinning = false;
    },
  });

  // circle, 40 units in front of the centre
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 80,
    translate: { z: 40 },
    stroke: 20,
    color: '#a35ac9',
  });

  // filled square, 40 units behind it
  new Zdog.Rect({
    addTo: illo,
    width: 80,
    height: 80,
    translate: { z: -40 },
    stroke: 12,
    color: '#E62',
    fill: true,
  });

  stage.loop(() => {
    illo.rotate.y += isSpinning ? 0.03 : 0;
    illo.updateRenderGraph();
  });

  return stage.dispose;
};

export default mount;

// Spin and drag: a mug on a turntable that you can grab, and that spins again when let go
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the mug to inspect it. Let go and it spins again.' });
  let isSpinning = true;
  let resumeAt = 0;

  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom,
    rotate: { x: -0.35 },
    dragRotate: true,
    onDragStart: () => {
      isSpinning = false;
    },
    onDragEnd: () => {
      resumeAt = performance.now() + 1500;
    },
  });

  // the mug: a cylinder standing upright (cylinders run along z, so turn it a quarter)
  const mug = new Zdog.Cylinder({
    addTo: illo,
    diameter: 90,
    length: 100,
    rotate: { x: Zdog.TAU / 4 },
    stroke: false,
    color: '#E62',
    frontFace: '#5b2a10', // the coffee, seen from above
    backface: '#C25',
  });
  // handle: half an ellipse on the side
  new Zdog.Ellipse({
    addTo: mug,
    width: 50,
    height: 56,
    quarters: 2,
    translate: { x: 45 },
    rotate: { x: Zdog.TAU / 4, z: Zdog.TAU / 4 },
    stroke: 10,
    color: '#E62',
  });
  // saucer under it
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 150,
    translate: { y: 54 },
    rotate: { x: Zdog.TAU / 4 },
    stroke: 8,
    fill: true,
    color: '#EA0',
  });

  stage.loop(() => {
    if (!isSpinning && resumeAt && performance.now() > resumeAt) {
      isSpinning = true;
      resumeAt = 0;
    }
    if (isSpinning) illo.rotate.y += 0.02;
    illo.updateRenderGraph();
  });

  return stage.dispose;
};

export default mount;

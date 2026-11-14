// Still render: draw a model once, with no loop, and redraw it only on demand
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button } from '../../shared/controls.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'No animation loop: every press renders one new still.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.45, y: -0.6 },
  });

  // mug body: a cylinder stood on end, its front face is the coffee
  new Zdog.Cylinder({
    addTo: illo,
    diameter: 90,
    length: 100,
    translate: { y: 15 },
    rotate: { x: TAU / 4 },
    stroke: false,
    color: '#E62',
    frontFace: '#7a4a2b',
    backface: '#C25',
  });
  // handle: half an ellipse, bulging to the right
  new Zdog.Ellipse({
    addTo: illo,
    diameter: 54,
    quarters: 2,
    translate: { x: 46, y: 15 },
    stroke: 12,
    color: '#E62',
  });
  // two wisps of steam
  for (const x of [-14, 14]) {
    new Zdog.Shape({
      addTo: illo,
      path: [{ x, y: 0 }, { x: x + 8, y: -12 }, { x, y: -24 }, { x: x + 8, y: -36 }],
      translate: { y: -50 },
      stroke: 4,
      color: '#fff',
      closed: false,
    });
  }

  // render once. updateRenderGraph() is all it takes; nothing calls it again by itself.
  const newStill = (): void => {
    illo.rotate.y = Math.random() * TAU;
    illo.updateRenderGraph();
  };
  newStill();

  if (stage.bar) button(stage.bar, 'new angle', newStill);
  else stage.every(1500, newStill);

  return stage.dispose;
};

export default mount;

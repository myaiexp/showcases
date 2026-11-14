// Drag-rotate item: dragging turns only the toy rocket, not podium or floor
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const TAU = Zdog.TAU;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the rocket: the podium does not move.' });
  let isSpinning = true;
  let resumeAt = 0;

  // dragRotate takes the item to turn; the item joins the scene afterwards
  const rocket = new Zdog.Anchor({ rotate: { y: 0.4 } });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 0.95,
    rotate: { x: -0.35 },
    dragRotate: rocket,
    onDragStart: () => {
      isSpinning = false;
    },
    onDragEnd: () => {
      resumeAt = performance.now() + 1500;
    },
  });

  // the stage: a floor ring and a podium
  new Zdog.Ellipse({ addTo: illo, diameter: 210, translate: { y: 72 }, rotate: { x: TAU / 4 }, stroke: 3, color: '#555' });
  new Zdog.Cylinder({
    addTo: illo, diameter: 130, length: 18, translate: { y: 62 }, rotate: { x: TAU / 4 },
    stroke: false, color: '#a35ac9', frontFace: '#c58ee0', backface: '#6a2f8a',
  });
  illo.addChild(rocket);

  // inside the rocket, +z is up once the body is turned a quarter
  const body = new Zdog.Anchor({ addTo: rocket, translate: { y: 8 }, rotate: { x: TAU / 4 } });
  new Zdog.Cylinder({ addTo: body, diameter: 52, length: 90, stroke: false, color: '#f2f2f2', frontFace: '#ddd', backface: '#bbb' });
  new Zdog.Cone({ addTo: body, diameter: 52, length: 44, translate: { z: 45 }, stroke: false, color: '#C25', backface: '#8a1a3a' });
  new Zdog.Ellipse({ addTo: body, diameter: 18, translate: { x: 26, z: 14 }, rotate: { y: TAU / 4 }, stroke: 4, fill: true, color: '#8fd3ff' });
  const fin = new Zdog.Shape({
    addTo: body, path: [{ x: 26, z: -10 }, { x: 56, z: -52 }, { x: 26, z: -48 }],
    stroke: 4, fill: true, color: '#C25',
  });
  for (let i = 1; i < 3; i++) fin.copy({ rotate: { z: (i * TAU) / 3 } });
  new Zdog.Cone({ addTo: body, diameter: 30, length: 26, translate: { z: -45 }, rotate: { y: TAU / 2 }, stroke: false, color: '#EA0', backface: '#E62' }); // flame

  stage.loop((dt) => {
    if (!isSpinning && resumeAt && performance.now() > resumeAt) {
      isSpinning = true;
      resumeAt = 0;
    }
    if (isSpinning) rocket.rotate.y += dt * 1.2;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

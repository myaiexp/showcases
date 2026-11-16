// Objects: wrap a <canvas> in fabric.Canvas, then add a Rect object and change it later
import { Canvas, Rect } from 'fabric';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { scene: [300, 200], hint: 'The rectangle is an object: select it, drag it, pull its corners.' });

  // create a wrapper around the native canvas element
  const canvas = stage.own(new Canvas(stage.el));

  // create a rectangle object; v7 places it by its centre (originX/originY default to 'center')
  const rect = new Rect({
    left: 150,
    top: 100,
    fill: 'red',
    width: 60,
    height: 60,
    angle: 45,
  });

  // "add" the rectangle onto the canvas
  canvas.add(rect);

  // Later changes go through set(); the canvas redraws on the next requestRenderAll().
  const looks = [
    { fill: 'red', angle: 45 },
    { fill: '#3b7dd8', angle: 0 },
    { fill: '#2e9e5b', angle: -20 },
  ];
  let i = 0;
  stage.every(stage.preview ? 1400 : 2200, () => {
    if (canvas.getActiveObject() === rect) return;
    rect.set(looks[++i % looks.length]!);
    canvas.requestRenderAll();
  });

  return stage.dispose;
};

export default mount;

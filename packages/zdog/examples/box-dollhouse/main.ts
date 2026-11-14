// Box dollhouse: a Box with some faces off is a cut-away furnished room
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
type Walls = { front: boolean; left: boolean; top: boolean };

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to look into the room.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.5, y: -0.55 },
    dragRotate: true,
  });
  const house = new Zdog.Anchor({ addTo: illo, translate: { y: 10 } });

  const walls: Walls = { front: false, left: false, top: false };
  let room: Zdog.Box | null = null;
  const build = (): void => {
    room?.remove();
    // pass `false` for a face and it is not made at all
    room = new Zdog.Box({
      addTo: house, width: 170, height: 110, depth: 140, stroke: 3, color: '#EA0',
      frontFace: walls.front ? '#ED0' : false,
      rearFace: false, // the back wall is a Group below, so its window can sit on it
      leftFace: walls.left ? '#FDB' : false,
      rightFace: '#C25',
      topFace: walls.top ? '#a35ac9' : false,
      bottomFace: '#8a5a2b',
    });
  };
  build();

  // furniture: smaller boxes standing on the floor (the floor is at y = 55)
  new Zdog.Box({
    addTo: house, width: 60, height: 22, depth: 90, stroke: false, color: '#5ad',
    topFace: '#cfe8ff', leftFace: '#4a8fd0', rightFace: '#3d7ab5', frontFace: '#4a8fd0', rearFace: '#4a8fd0',
    translate: { x: -45, y: 44, z: 0 },
  });
  new Zdog.Box({
    addTo: house, width: 52, height: 8, depth: 22, stroke: false, color: '#ddd',
    topFace: '#fff', rightFace: '#ccc', translate: { x: -45, y: 28, z: -34 },
  });
  new Zdog.Box({
    addTo: house, width: 36, height: 30, depth: 36, stroke: false, color: '#a35ac9',
    topFace: '#d8a8f0', leftFace: '#8a45b0', rightFace: '#74389a', translate: { x: 48, y: 40, z: 20 },
  });
  new Zdog.Cylinder({
    addTo: house, diameter: 10, length: 40, stroke: false, color: '#FDB', frontFace: '#ED0',
    translate: { x: 60, y: 15, z: 20 }, rotate: { x: TAU / 4 },
  });
  // a window on the back wall and a rug on the floor
  const back = new Zdog.Group({ addTo: house, translate: { z: -70 } });
  new Zdog.Rect({ addTo: back, width: 170, height: 110, stroke: 3, fill: true, color: '#E62' });
  new Zdog.Rect({ addTo: back, width: 46, height: 34, stroke: 3, fill: true, color: '#9df', translate: { x: 30, y: -10 } });
  new Zdog.Rect({
    addTo: house, width: 50, height: 36, stroke: 2, fill: true, color: '#C25',
    translate: { x: 10, y: 54, z: 50 }, rotate: { x: TAU / 4 },
  });

  if (stage.bar) {
    checkbox(stage.bar, 'front wall', walls.front, (v) => { walls.front = v; build(); });
    checkbox(stage.bar, 'left wall', walls.left, (v) => { walls.left = v; build(); });
    checkbox(stage.bar, 'ceiling', walls.top, (v) => { walls.top = v; build(); });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -0.55 + Math.sin(t * 0.7) * 0.45;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

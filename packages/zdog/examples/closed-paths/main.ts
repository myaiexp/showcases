// Open and closed paths: the same house outline with and without the line back to the start
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag to turn it. Look at the floor.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.25,
    rotate: { x: -0.3, y: -0.6 },
    dragRotate: true,
  });

  let closed = true;
  let fill = false;
  let house: Zdog.Anchor | null = null;
  const build = (): void => {
    house?.remove();
    house = new Zdog.Anchor({ addTo: illo, translate: { y: 8 } });
    // five points, the last one is the corner of the floor, not the start
    const path = [
      { x: -50, y: 40 },
      { x: -50, y: -14 },
      { x: 0, y: -52 },
      { x: 50, y: -14 },
      { x: 50, y: 40 },
    ];
    // front and back walls are the same outline at two depths
    for (const z of [-32, 32]) {
      new Zdog.Shape({ addTo: house, path, closed, fill, stroke: 7, color: closed ? '#EA0' : '#E62', translate: { z } });
    }
    // rafters join the two outlines
    for (const p of path.slice(1, 4)) {
      new Zdog.Shape({ addTo: house, path: [{ ...p, z: -32 }, { ...p, z: 32 }], stroke: 7, color: '#a35ac9' });
    }
  };
  build();

  if (stage.bar) {
    checkbox(stage.bar, 'closed', closed, (v) => { closed = v; build(); });
    checkbox(stage.bar, 'fill', fill, (v) => { fill = v; build(); });
  } else {
    stage.every(1500, () => { closed = !closed; build(); });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) illo.rotate.y = -0.6 + Math.sin(t * 0.7) * 0.5;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

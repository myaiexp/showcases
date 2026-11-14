// Z-fighting: two chain links that cross over and under each other as they turn
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { slider } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Zdog sorts whole shapes, so overlapping ones swap places mid-turn.' });
  const illo = new Zdog.Illustration({
    element: stage.element,
    zoom: stage.zoom * 1.1,
    rotate: { x: -0.25 },
  });

  // two rings in the same plane, overlapping like links of a chain
  const ringA = new Zdog.Ellipse({ addTo: illo, diameter: 110, translate: { x: -38 }, stroke: 20, color: '#E62' });
  const ringB = new Zdog.Ellipse({ addTo: illo, diameter: 110, translate: { x: 38 }, stroke: 20, color: '#EA0' });

  let speed = 1;
  if (stage.bar) {
    slider(stage.bar, 'overlap', 0, 70, 1, 38, (v) => {
      ringA.translate.x = -v;
      ringB.translate.x = v;
    }, (v) => `${(110 - 2 * v).toFixed(0)}`);
    slider(stage.bar, 'speed', 0, 3, 0.1, speed, (v) => { speed = v; });
  }

  stage.loop((dt, t) => {
    if (stage.preview) {
      illo.rotate.y += dt * 0.9;
    } else {
      illo.rotate.y += dt * speed;
    }
    void t;
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

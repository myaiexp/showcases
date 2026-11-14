// Update path (drag): drag a sail's corner, then updatePath() applies it
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { button, readout } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag anywhere to pull the tip of the sail.' });
  const illo = new Zdog.Illustration({ element: stage.element, zoom: stage.zoom * 1.1, rotate: { y: -0.25 } });

  new Zdog.Shape({ addTo: illo, path: [{ x: -80, y: 70 }, { x: 80, y: 70 }], stroke: 4, color: '#5aa8ff' });
  // hull
  new Zdog.Shape({
    addTo: illo, closed: true, fill: true, stroke: 10, color: '#C25',
    path: [{ x: -62, y: 45 }, { x: 62, y: 45 }, { x: 44, y: 66 }, { x: -44, y: 66 }],
  });
  new Zdog.Shape({ addTo: illo, path: [{ y: 45 }, { y: -80 }], stroke: 6, color: '#EA0' });
  // the sail: its first path point is the tip we move
  const points = [{ x: 0, y: -75 }, { x: 0, y: 36 }, { x: 70, y: 36 }];
  const sail = new Zdog.Shape({ addTo: illo, closed: true, fill: true, stroke: 6, color: '#fff', translate: { z: 4 }, path: points });
  const tip = points[0]!;
  const rest = { x: tip.x, y: tip.y };
  const info = stage.bar ? readout(stage.bar) : null;
  const show = (): void => {
    if (info) info.textContent = `path[0] = { x: ${Math.round(tip.x)}, y: ${Math.round(tip.y)} }`;
  };
  show();

  let startX = 0;
  let startY = 0;
  if (stage.bar) {
    new Zdog.Dragger({
      startElement: stage.element,
      onDragStart() {
        startX = tip.x;
        startY = tip.y;
      },
      onDragMove(_pointer, moveX, moveY) {
        // pointer moves are in screen pixels, the path in scene units
        tip.x = startX + moveX / illo.zoom;
        tip.y = startY + moveY / illo.zoom;
        sail.updatePath(); // the path changed, so rebuild the shape
        show();
      },
    });
    button(stage.bar, 'Reset sail', () => { tip.x = rest.x; tip.y = rest.y; sail.updatePath(); show(); });
  }

  stage.loop((_dt, t) => {
    if (stage.preview) {
      // the card pulls the tip around by itself
      tip.x = rest.x + 45 * Math.sin(t * 1.5);
      tip.y = rest.y + 25 * Math.cos(t * 1.1);
      sail.updatePath();
      illo.rotate.y = -0.25 + 0.2 * Math.sin(t * 0.7);
    }
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;

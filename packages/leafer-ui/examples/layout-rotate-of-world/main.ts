// Layout: rotateOfWorld turns around a point of the canvas
import type { Mount } from '@/types.ts';
import { worldLab } from '../../shared/world-lab.ts';

const mount: Mount = (el, ctx) =>
  worldLab(el, ctx, {
    hint: 'Tap the pane to set the world origin (the red dot); the green square is the dashed one turned around it.',
    range: [-180, 180, 1],
    value: 45,
    apply(rect, origin, a) {
      rect.rotateOfWorld(origin, a);
      return `rect.rotateOfWorld(origin, ${a})`;
    },
  }).dispose;

export default mount;

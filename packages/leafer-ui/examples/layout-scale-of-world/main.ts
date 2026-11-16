// Layout: scaleOfWorld scales around a point of the canvas
import type { Mount } from '@/types.ts';
import { worldLab } from '../../shared/world-lab.ts';

const mount: Mount = (el, ctx) =>
  worldLab(el, ctx, {
    hint: 'Tap the pane to set the world origin (the red dot); the green square is the dashed one scaled around it.',
    range: [0.4, 2, 0.05],
    value: 1.5,
    apply(rect, origin, k) {
      rect.scaleOfWorld(origin, k);
      return `rect.scaleOfWorld(origin, ${k.toFixed(2)})`;
    },
  }).dispose;

export default mount;

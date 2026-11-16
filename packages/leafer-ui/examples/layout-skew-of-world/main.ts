// Layout: skewOfWorld shears around a point of the canvas
import type { Mount } from '@/types.ts';
import { worldLab } from '../../shared/world-lab.ts';

const mount: Mount = (el, ctx) =>
  worldLab(el, ctx, {
    hint: 'Tap the pane to set the world origin (the red dot); the green square is the dashed one sheared around it.',
    range: [-60, 60, 1],
    value: 30,
    apply(rect, origin, a) {
      rect.skewOfWorld(origin, a);
      return `rect.skewOfWorld(origin, ${a})`;
    },
  }).dispose;

export default mount;

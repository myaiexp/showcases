// Layout: from a world point to page, local, inner and box points
import type { Mount } from '@/types.ts';
import { pointLab } from '../../shared/point-lab.ts';

const mount: Mount = (el, ctx) =>
  pointLab(el, ctx, {
    hint: 'A world point (the red dot) goes round the rect; each method converts it into another coordinate system.',
    space: 'world',
    zoom: 1.2,
    methods: [
      { name: 'getPagePoint(world)', call: (r, p) => r.getPagePoint(p) },
      { name: 'getLocalPoint(world)', call: (r, p) => r.getLocalPoint(p) },
      { name: 'getInnerPoint(world)', call: (r, p) => r.getInnerPoint(p) },
      { name: 'getBoxPoint(world)', call: (r, p) => r.getBoxPoint(p) },
    ],
  }).dispose;

export default mount;

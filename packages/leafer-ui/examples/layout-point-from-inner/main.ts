// Layout: from an inner point to world, local and box points
import type { Mount } from '@/types.ts';
import { pointLab } from '../../shared/point-lab.ts';

const mount: Mount = (el, ctx) =>
  pointLab(el, ctx, {
    hint: "An inner point is in the element's own space. Each method converts it; the red dot marks it on the canvas.",
    space: 'inner',
    methods: [
      { name: 'getWorldPoint(inner)', call: (r, p) => r.getWorldPoint(p) },
      { name: 'getLocalPointByInner(inner)', call: (r, p) => r.getLocalPointByInner(p) },
      { name: 'getBoxPointByInner(inner)', call: (r, p) => r.getBoxPointByInner(p) },
    ],
  }).dispose;

export default mount;

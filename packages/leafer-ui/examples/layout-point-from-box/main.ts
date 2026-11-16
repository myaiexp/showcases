// Layout: from a box point to world and inner points
import type { Mount } from '@/types.ts';
import { pointLab } from '../../shared/point-lab.ts';

const mount: Mount = (el, ctx) =>
  pointLab(el, ctx, {
    hint: "A box point counts from the element's own top-left corner. Each method converts it; the red dot marks it on the canvas.",
    space: 'box',
    methods: [
      { name: 'getWorldPointByBox(box)', call: (r, p) => r.getWorldPointByBox(p) },
      { name: 'getInnerPointByBox(box)', call: (r, p) => r.getInnerPointByBox(p) },
    ],
  }).dispose;

export default mount;

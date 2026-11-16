// Layout: from a local point to world and inner points
import type { Mount } from '@/types.ts';
import { pointLab } from '../../shared/point-lab.ts';

const mount: Mount = (el, ctx) =>
  pointLab(el, ctx, {
    hint: "A local point is in the parent's space (the group's). Each method converts it; the red dot marks it on the canvas.",
    space: 'local',
    methods: [
      { name: 'getWorldPointByLocal(local)', call: (r, p) => r.getWorldPointByLocal(p) },
      { name: 'getInnerPointByLocal(local)', call: (r, p) => r.getInnerPointByLocal(p) },
    ],
  }).dispose;

export default mount;

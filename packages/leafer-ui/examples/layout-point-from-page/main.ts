// Layout: from a page point to a world point
import type { Mount } from '@/types.ts';
import { pointLab } from '../../shared/point-lab.ts';

const mount: Mount = (el, ctx) =>
  pointLab(el, ctx, {
    hint: 'The Leafer is zoomed, so page points (before the zoom) differ from world points (the canvas).',
    space: 'page',
    zoom: 1.4,
    methods: [{ name: 'getWorldPointByPage(page)', call: (r, p) => r.getWorldPointByPage(p) }],
  }).dispose;

export default mount;

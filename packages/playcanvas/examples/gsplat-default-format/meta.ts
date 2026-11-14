// playcanvas example: Procedural splats, the default format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Procedural splats: the default format',
  summary:
    'The default GSplatFormat stores a centre, a colour, a three-axis scale and a rotation quaternion per splat. Here flat discs sit on a sphere and are turned outwards through dataRotation; the full view rewrites the dataScale stream (thickness) and the dataRotation stream (aligned or all identity) to show what each stream does.',
  section: 'Gaussian Splatting',
  tags: ['GSplatFormat.createDefaultFormat', 'dataCenter', 'dataColor', 'dataScale', 'dataRotation', 'GSplatContainer', 'Texture.lock'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-data-format.md',
    'repo/docs/user-manual/gaussian-splatting/what-is-gaussian-splatting.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

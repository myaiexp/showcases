// playcanvas example: A splat PLY built in memory
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A splat PLY built in memory',
  summary:
    'The PLY layout from the format page, written by hand: a header of float properties (x y z, f_dc_0..2, opacity, scale_0..2, rot_0..3) and one binary row per splat, with colour as a spherical-harmonic coefficient, opacity as a logit and scale as a log. The bytes go through a blob URL ending in .ply into a gsplat asset and a gsplat component, as a downloaded file would.',
  section: 'Gaussian Splatting',
  tags: ['PLY', 'Asset', 'gsplat asset', 'gsplat component', 'f_dc_0', 'opacity', 'scale_0', 'rot_0', 'GSplatResource'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/formats/ply.md',
    'repo/docs/user-manual/gaussian-splatting/formats/index.md',
    'repo/docs/user-manual/gaussian-splatting/building/your-first-app/engine.md',
    'repo/docs/user-manual/gaussian-splatting/rendering-architecture/splat-data-format.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

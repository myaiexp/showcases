// playcanvas example: Lines and shapes as splats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Lines, arrows and boxes with GsplatLines',
  summary:
    'GsplatLines builds debug primitives out of splats: gradient lines, single-colour lines, arrows with a pyramid head and wireframe AABBs, each returning a handle for removePrimitive. A set of axes and a box turn in the card; the full view adds random lines, removes the last one and clears everything while primitiveCount follows.',
  section: 'Gaussian Splatting',
  tags: ['GsplatLines', 'addLine', 'addLineSimple', 'addArrow', 'addAABB', 'removePrimitive', 'clear', 'primitiveCount'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/lines.md',
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

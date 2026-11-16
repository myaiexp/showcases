// aframe example: <a-plane>: width, height, segments and a tiled ground
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '<a-plane>: width, height, segments and a tiled ground',
  summary:
    '<a-plane> is a flat rectangle. Rotated -90 degrees about X it becomes the ground, here 40 by 40 metres with its texture repeated ten times each way. A standing plane shows the basic form, and a wireframe one shows segments-width and segments-height.',
  section: 'Primitives',
  tags: ['a-plane', 'width', 'height', 'segments-width', 'segments-height', 'repeat', 'rotation'],
  docs: ['repo/docs/primitives/a-plane.md', 'repo/docs/components/geometry.md', 'repo/docs/components/material.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

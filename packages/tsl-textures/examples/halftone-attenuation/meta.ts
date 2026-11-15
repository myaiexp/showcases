// tsl-textures example: Halftone attenuation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Halftone attenuation',
  summary:
    "halftone() with attenuation 1: five spheres at different depths slide back and forth, and their dots shrink between the near and far distances until the far ones vanish.",
  section: 'Textures',
  tags: ['halftone', 'attenuation', 'near', 'far', 'positionView', 'discard'],
  docs: ['repo/docs/halftone.md', 'repo/src/halftone.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

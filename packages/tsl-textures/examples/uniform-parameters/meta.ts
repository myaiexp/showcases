// tsl-textures example: Uniforms as parameters
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Uniforms as parameters',
  summary:
    "Each texture is a TSL Fn, so its parameters accept nodes as well as numbers and Colors. zebraLines() gets uniform() nodes for theta, thinness and the background, and the frame loop writes their .value to turn and recolour the stripes without recompiling.",
  section: 'Getting started',
  tags: ['uniform', 'zebraLines', 'theta', 'thinness', 'Fn'],
  docs: ['repo/docs/zebra-lines.md', 'repo/src/zebra-lines.js', 'repo/CHANGELOG.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

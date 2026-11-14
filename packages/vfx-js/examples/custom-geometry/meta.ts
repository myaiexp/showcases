// custom geometry in ctx.draw
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom geometry: a grid of points',
  summary:
    'ctx.draw takes an EffectGeometry in place of the default quad. Here it is a grid of points with its own vertex shader, which samples the input for each point\'s colour. Changing the grid size builds a new geometry and releases the old one.',
  section: 'Custom Effects',
  tags: ['EffectGeometry', 'geometry', 'mode points', 'attributes', 'vert', 'ctx.releaseGeometry', 'ctx.clear'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md', 'repo/packages/vfx-js/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

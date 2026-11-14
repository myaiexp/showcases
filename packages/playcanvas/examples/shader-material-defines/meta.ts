// playcanvas example: Material shader defines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Material shader defines with setDefine',
  summary:
    'Material.setDefine adds #define lines to a material\'s shader: a flag (USE_STRIPES, set with true and removed with false) and a valued define (PALETTE FIRE, ICE or TOXIC) that an #if/#elif chain reads. Three materials built from one description get three palettes, and the full view toggles the flag and swaps a palette.',
  section: 'Graphics: Shaders',
  tags: ['Material.setDefine', '#define', '#ifdef', '#if', '#elif', 'ShaderMaterial'],
  docs: ['repo/docs/user-manual/graphics/shaders/index.md', 'repo/docs/user-manual/graphics/shaders/preprocessor.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

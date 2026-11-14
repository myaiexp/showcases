// ctx.draw blend modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ctx.draw blend modes side by side',
  summary:
    'Four pictures run the same two draws: opaque stripes, then the picture drawn at alpha 0.5 over them. The only difference is the blend option of the second draw: none, normal, premultiplied or additive.',
  section: 'Custom Effects',
  tags: ['ctx.draw', 'blend', 'none', 'normal', 'premultiplied', 'additive', 'factory'],
  docs: ['pages/amagi-dev/vfx-js/custom-effects.md', 'repo/docs/EFFECT.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

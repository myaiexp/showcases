// VFX-JS example: the post effect guide's chromatic aberration shader
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Chromatic aberration post effect',
  summary:
    'The chromatic aberration shader from the post effect guide: red is sampled pushed outwards from the centre and blue pulled inwards, by aberrationStrength × the distance, so colour fringes grow towards the edges. Here centre is a uniform pointing at the stage, since the canvas covers the window.',
  section: 'Post effects',
  tags: ['postEffect', 'chromatic aberration', 'uniforms'],
  docs: ['repo/docs/POSTEFFECT_EXAMPLE.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

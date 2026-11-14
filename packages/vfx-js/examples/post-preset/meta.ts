// VFX-JS example: the grayscale preset used as a post effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A preset as a post effect',
  summary:
    'new VFX({ postEffect: { shader: "grayscale" } }) runs the grayscale preset over the whole VFX canvas after every element has been drawn. The picture keeps its sinewave and the headline its rainbow, but both come out grey. It only sees what VFX-JS draws, not the rest of the page.',
  section: 'Post effects',
  tags: ['postEffect', 'grayscale', 'VFXOpts', 'shader preset'],
  docs: ['pages/amagi-dev/vfx-js/shaders.md', 'repo/docs/POSTEFFECT_EXAMPLE.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

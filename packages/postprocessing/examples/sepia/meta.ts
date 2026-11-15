// postprocessing example: SepiaEffect strength through blendMode.opacity and its weight vectors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sepia',
  summary:
    'SepiaEffect multiplies each pixel by three weight vectors. The deprecated intensity is replaced by blendMode.opacity, and writing new numbers into weightsR, weightsG and weightsB turns the sepia into a cyanotype or a green-phosphor screen.',
  section: 'Color Grading',
  tags: ['SepiaEffect', 'weightsR', 'weightsG', 'weightsB', 'blendMode', 'opacity'],
  docs: ['repo/README.md', 'repo/src/effects/SepiaEffect.js', 'repo/src/effects/glsl/sepia.frag', 'repo/src/effects/blending/BlendMode.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

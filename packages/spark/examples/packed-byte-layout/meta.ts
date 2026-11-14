// Spark example: inspecting the 16-byte layout of one packed splat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The 16-byte packed splat',
  summary:
    'Every splat in a PackedSplats is four uint32 words. Slide through a torus knot and the page prints that splat\'s 16 bytes, coloured by field (rgba, float16 centre, octahedral quaternion, log scales) next to what utils.unpackSplat decodes from them, while a white marker splat sits on the one you picked.',
  section: 'PackedSplats',
  tags: ['PackedSplats', 'packedArray', 'unpackSplat', 'getSplat', 'byte layout'],
  docs: ['repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

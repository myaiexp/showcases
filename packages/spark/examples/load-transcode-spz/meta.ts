// Spark example: transcodeSpz fractionalBits, clipXyz and opacityThreshold
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transcoding and writing SPZ',
  summary:
    'A knot with scattered opacities is written to .spz with writeSpz, then transcodeSpz re-encodes it with fewer position bits (fractionalBits), a clip box (clipXyz) and an opacity cutoff (opacityThreshold). The original sits on the left, the transcoded file loaded from its new bytes on the right, each labelled with its size and splat count.',
  section: 'Loading Splats',
  tags: ['transcodeSpz', 'writeSpz', 'SPZ', 'fractionalBits', 'clipXyz', 'opacityThreshold'],
  docs: ['repo/docs/docs/loading-splats.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

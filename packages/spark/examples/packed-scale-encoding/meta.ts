// Spark example: the stepped log-scale encoding of PackedSplats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The log scale encoding',
  summary:
    'Each splat scale is stored as one uint8 on a logarithmic scale, so sizes come back in discrete steps of about e^(21/254). A row of bars is written with smoothly growing heights; the readout and the chart compare the requested scale with the decoded one byte by byte, and the bars visibly grow in plateaus rather than smoothly.',
  section: 'PackedSplats',
  tags: ['PackedSplats', 'scale encoding', 'setSplat', 'unpackSplat', 'lnScaleMin', 'lnScaleMax'],
  docs: ['repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

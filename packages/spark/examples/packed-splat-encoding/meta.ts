// Spark example: the splatEncoding colour range of PackedSplats for HDR values
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom splatEncoding ranges',
  summary:
    'Two rows of glowing bulbs hold colours well above 1. The top row is packed with the default 0..1 range, so the hot channels clip; the bottom row sets splatEncoding.rgbMax so the same values survive. Lower the exposure (SplatMesh recolor) to see the clipped bulbs go flat while the wide-range ones keep their warm gradient, and read the stored values below.',
  section: 'PackedSplats',
  tags: ['PackedSplats', 'splatEncoding', 'rgbMax', 'setPackedSplat', 'recolor'],
  docs: ['repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

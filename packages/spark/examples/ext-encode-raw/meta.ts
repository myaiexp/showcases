// Spark example: building ExtSplats from raw extArrays with utils.encodeExtSplat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Encoding ExtSplats arrays by hand',
  summary:
    'A sunflower spiral written straight into the two Uint32Arrays an ExtSplats stores, one utils.encodeExtSplat call per splat: float32 centre, log-scale float16 sizes, a 10/10/12-bit quaternion, float16 colour and opacity. The arrays go to new ExtSplats({ extArrays, numSplats }), and the full view decodes a few splats back with decodeExtSplat.',
  section: 'ExtSplats',
  tags: ['ExtSplats', 'extArrays', 'encodeExtSplat', 'decodeExtSplat', 'utils'],
  docs: ['repo/docs/docs/ext-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

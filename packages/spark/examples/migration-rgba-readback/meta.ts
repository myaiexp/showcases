// Spark example: the 2.0 replacement for getRgba, reading generated splat RGBA back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Reading splat colours back',
  summary:
    'Spark 0.1 had SparkRenderer.getRgba(); in 2.0 you run the mesh’s own generator through a dyno block into an RgbaArray and read() the bytes. A SET_RGB sphere sweeps white through a rainbow knot, and the hue histogram below, built from the read-back colours, shows the white region removing colour from it. Random tint changes recolor, which the readback includes too.',
  section: 'Migration Guide',
  tags: ['RgbaArray', 'dyno.dynoBlock', 'generator', 'splitGsplat', 'readback'],
  docs: ['repo/docs/docs/0.1-2.0-migration-guide.md', 'repo/docs/docs/dyno-overview.md', 'repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

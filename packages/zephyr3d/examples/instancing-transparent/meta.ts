// zephyr3d example: Transparent instances need OIT
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Transparent instances need OIT',
  summary:
    'A cube of translucent bubbles, all instances of one blended material, drawn in a single instanced call. Instances cannot be sorted back to front one by one, so without OIT the overlaps blend in the wrong order; WeightedBlendedOIT on the camera fixes that.',
  section: 'Geometry Instancing',
  tags: ['createInstance', 'blendMode', 'WeightedBlendedOIT', 'camera.oit'],
  docs: ['repo/apps/doc/web/en/instancing-intro.md', 'repo/apps/doc/web/en/oit.md', 'repo/apps/doc/web/en/particles-sprites.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

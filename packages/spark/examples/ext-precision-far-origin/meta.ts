// Spark example: float16 centre quantization in PackedSplats against ExtSplats far from origin
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Float16 against float32 centres far from the origin',
  summary:
    'Two spheres built from the same splats, their centres stored hundreds of units from the origin and the meshes moved back into view. PackedSplats keeps centres as float16, about 0.1% precision, so far out the splats snap to a coarse grid of stripes; ExtSplats keeps float32 centres in 32 bytes per splat and stays smooth. Raise the offset to watch the left sphere fall apart.',
  section: 'ExtSplats',
  tags: ['ExtSplats', 'PackedSplats', 'float16', 'extSplats', 'precision'],
  docs: ['repo/docs/docs/ext-splats.md', 'repo/docs/docs/lod-getting-started.md', 'repo/docs/docs/packed-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

// Spark example: SplatMesh.getBoundingBox with centers_only true and false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bounding boxes: centres only or full extent',
  summary:
    'A pulsing cloud of large flat splats, with getBoundingBox(true) in yellow and getBoundingBox(false) in red, both refreshed every frame and drawn as Box3Helpers parented to the mesh. The yellow box hugs the splat centres; the red one grows to include each splat’s scale and orientation.',
  section: 'SplatMesh',
  tags: ['getBoundingBox', 'Box3Helper', 'setSplat'],
  docs: ['repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

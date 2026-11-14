// playcanvas example: CameraFrame vignette and fringing
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame vignette colour and fringing',
  summary:
    'The vignette blends the image edges towards vignette.color between inner and outer, with curvature shaping the rounded rectangle (an outer below the inner reverses it), and fringing separates the colour channels towards the edges like a cheap lens. The card breathes both; the full view sets every parameter and picks the vignette colour.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'vignette.intensity', 'vignette.color', 'vignette.inner', 'vignette.outer', 'vignette.curvature', 'fringing.intensity'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

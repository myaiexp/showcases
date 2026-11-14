// playcanvas example: CameraFrame debug views
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CameraFrame debug views',
  summary:
    'cameraFrame.debug shows an intermediate result in place of the composed image: scene, ssao, bloom, vignette, dofcoc, dofblur or depth. A scene with SSAO, bloom, vignette and depth of field all enabled steps through the views on the card; the full view picks one, and null returns to the final image.',
  section: 'Graphics: Post Effects',
  tags: ['CameraFrame', 'debug', 'dofcoc', 'dofblur', 'ssao', 'depth', 'update()'],
  docs: ['repo/docs/user-manual/graphics/posteffects/cameraframe/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

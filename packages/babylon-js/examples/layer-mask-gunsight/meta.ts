// babylon-js example: layer masks and a crosshair camera
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer masks and a crosshair camera',
  summary:
    'A second orthographic camera and a merged crosshair mesh share the layerMask 0x20000000, so only that camera draws the sight on top of the orbiting main camera. Lights get excludeWithLayerMask so they skip it, and a layerMask of 0 hides it from everyone.',
  section: 'Cameras',
  tags: ['layerMask', 'scene.activeCameras', 'Camera.ORTHOGRAPHIC_CAMERA', 'excludeWithLayerMask', 'Mesh.MergeMeshes'],
  docs: ['repo/content/features/featuresDeepDive/cameras/layerMasksAndMultiCam.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

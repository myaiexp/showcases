// galacean example: OrthoControl for 2D scenes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "OrthoControl for 2D scenes",
  summary:
    "OrthoControl pans and zooms an orthographic camera, as in a 2D scene. Drag to pan and use the wheel to zoom in the full view; the card scripts the same pan and zoom.",
  section: "Camera",
  tags: ['OrthoControl', 'isOrthographic', 'orthographicSize', 'zoomSpeed'],
  docs: [
    'repo/docs/en/graphics/camera/control.mdx',
    'repo/docs/en/graphics/camera/camera.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

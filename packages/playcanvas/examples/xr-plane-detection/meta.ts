// playcanvas example: Plane detection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plane detection',
  summary:
    "Plane detection reports large flat surfaces, each with a pose, a polygon of points, an orientation and a semantic label such as floor, wall or table. A simulated scan adds a floor, a wall and a table; each plane becomes a mesh built with the docs' fan of triangles around its origin and coloured by label, and the wall grows through the change event as more of it is seen. In an AR session started with planeDetection: true the same add handler receives real XrPlanes.",
  section: 'XR',
  tags: ['XrPlaneDetection', 'XrPlane', 'points', 'label', 'orientation', 'planeDetection: true', 'Mesh'],
  docs: ['repo/docs/user-manual/xr/ar/plane-detection.md', 'repo/docs/user-manual/xr/ar/mesh-detection.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

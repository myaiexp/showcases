// aframe example: stats: the performance panel
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "stats: the performance panel",
  summary: "Adding stats to the scene shows a panel of metrics: fps and frame latency, textures, shader programs, geometries, vertices, faces, draw calls, load time and the entity count. Spheres are added and removed from a button so the geometry, vertex and entity counts visibly climb and fall; clicking a heading collapses its group.",
  section: 'Components',
  tags: ["stats", "fps", "raf", "Textures", "Programs", "Geometries", "Vertices", "Faces", "Calls", "Entities"],
  docs: ["repo/docs/components/stats.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

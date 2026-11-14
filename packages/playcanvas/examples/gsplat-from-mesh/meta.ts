// playcanvas example: Mesh to splats
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Mesh to splats with GsplatMesh',
  summary:
    'The GsplatMesh script rasterises the triangles of an entity hierarchy into evenly spread splats, coloured from each material\'s emissive or diffuse colour. A box, a sphere and a torus on a hidden layer become splats through buildFromEntity; the full view changes splatSize and shows the source meshes beside the result.',
  section: 'Gaussian Splatting',
  tags: ['GsplatMesh', 'buildFromEntity', 'splatSize', 'splatCount', 'GSplatContainer', 'render component', 'StandardMaterial.emissive'],
  docs: [
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/mesh.md',
    'repo/docs/user-manual/gaussian-splatting/building/procedural-splats/index.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

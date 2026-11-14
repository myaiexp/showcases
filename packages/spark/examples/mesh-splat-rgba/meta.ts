// Spark example: SplatMesh.splatRgba baking an edit's colours into an RgbaArray
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Baking colours with splatRgba',
  summary:
    'A pink SplatEdit sphere sweeps through a knot, painting only while it overlaps. Each bake runs the mesh’s generator through an RgbaArray and assigns it to SplatMesh.splatRgba, so what the sphere touched stays painted after it leaves and a trail builds up. Clear sets splatRgba back to null.',
  section: 'SplatMesh',
  tags: ['splatRgba', 'RgbaArray', 'SplatEdit', 'dyno.dynoBlock', 'updateGenerator'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/0.1-2.0-migration-guide.md', 'repo/docs/docs/splat-editing.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

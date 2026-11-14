// Spark example: modifiers.setWorldNormalColor and setDepthColor on a SplatMesh
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Normal and depth colouring',
  summary:
    'A torus of flat splats shown through Spark’s two exported modifiers: setWorldNormalColor paints each splat by the direction it faces (its thinnest axis), and setDepthColor paints it by distance from the camera between a min and max depth, optionally reversed. Both work by setting enableWorldToView and a worldModifier on the mesh.',
  section: 'SplatMesh',
  tags: ['modifiers', 'setWorldNormalColor', 'setDepthColor', 'worldModifier', 'enableWorldToView', 'gsplatNormal'],
  docs: ['repo/docs/docs/splat-mesh.md', 'repo/docs/docs/dyno-stdlib.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

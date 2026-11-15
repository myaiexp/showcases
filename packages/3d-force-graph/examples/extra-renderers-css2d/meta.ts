// 3d-force-graph example: Initialisation: extraRenderers with CSS2DRenderer
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Initialisation: extraRenderers with CSS2DRenderer',
  summary:
    'extraRenderers lists renderers that draw next to WebGL. A CSS2DRenderer turns CSS2DObject labels into real HTML elements that follow the nodes. nodeThreeObject adds one per node and nodeThreeObjectExtend keeps the sphere underneath.',
  section: 'Initialisation',
  tags: ['ForceGraph3D', 'extraRenderers', 'nodeThreeObject', 'nodeThreeObjectExtend'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

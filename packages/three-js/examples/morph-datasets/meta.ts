// Three.js example: morphTargetInfluences tweened between merged datasets
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Morph targets between datasets',
  summary:
    'Four generated datasets are built as merged box geometries of equal vertex count; the first is the base and all four become morph targets. Easing morphTargetInfluences animates thousands of boxes at once.',
  section: 'Optimization',
  tags: ['morphAttributes', 'morphTargetInfluences', 'mergeGeometries', 'vertexColors', 'tween'],
  docs: [
    'repo/manual/pages/optimize-lots-of-objects-animated.html',
    'repo/manual/pages/optimize-lots-of-objects.html',
    'repo/docs/pages/module-BufferGeometryUtils.html.md',
    'repo/docs/pages/BufferGeometry.html.md',
    'repo/docs/pages/Mesh.html.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

// Spark example: renderEnvMap giving a chrome sphere a splat reflection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'renderEnvMap reflections',
  summary:
    'A chrome MeshStandardMaterial sphere sits among four spinning torus knots of splats. SparkRenderer.renderEnvMap() renders the splats as seen from the sphere’s centre into a cube map, filters it with PMREM, and returns a texture that recurseSetEnvMap() assigns to the sphere’s envMap, so the splats appear in its reflection. The map is refreshed several times a second so it follows the rotation; the slider roughens the metal.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'renderEnvMap', 'recurseSetEnvMap', 'MeshStandardMaterial', 'image-based lighting'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

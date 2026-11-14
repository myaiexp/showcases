// Spark example: renderCubeMap baking splats into a CubeTexture scene.background
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'renderCubeMap background',
  summary:
    'The splat world around the origin, viewed from an eye that wanders in a small circle. renderCubeMap() renders the splats from a world centre into six cube faces and returns a THREE.CubeTexture; once it is set as scene.background the splats can be hidden and the backdrop costs one cheap draw, at the price of the parallax the live splats show. A normal mesh stays live in front of either. The full view has Bake and face-size controls; the card alternates by itself.',
  section: 'SparkRenderer',
  tags: ['SparkRenderer', 'renderCubeMap', 'CubeTexture', 'scene.background'],
  docs: ['repo/docs/docs/spark-renderer.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

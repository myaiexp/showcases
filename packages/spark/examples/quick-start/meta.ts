// Spark example: the Getting Started snippet, a butterfly.spz SplatMesh spinning in place
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Quick start: the butterfly',
  summary:
    'The docs’ first program: a WebGLRenderer, a SparkRenderer added to the scene, and one SplatMesh loaded from a URL, flipped out of OpenCV axes and spun a little every frame. The card spins a procedural stand-in; the full view loads butterfly.spz.',
  section: 'Getting Started',
  tags: ['SparkRenderer', 'SplatMesh', 'url', 'initialized', '.spz'],
  docs: ['repo/docs/docs/index.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

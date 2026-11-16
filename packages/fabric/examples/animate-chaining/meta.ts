// fabric example: Animation: Chaining animations
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: Chaining animations',
  summary:
    'Each step is an animate() whose onComplete starts the next; wrapping one step in a promise makes the sequence read top to bottom.',
  section: 'Animation',
  tags: ['animate', 'onComplete', 'Promise'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/docs/core-concepts.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeInOutQuad.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

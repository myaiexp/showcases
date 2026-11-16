// fabric example: Animation: runningAnimations and cancelling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: runningAnimations and cancelling',
  summary:
    'runningAnimations lists every live animation on the page; cancelByTarget and cancelByCanvas abort the ones that belong to an object or a canvas.',
  section: 'Animation',
  tags: ['runningAnimations', 'cancelByTarget', 'cancelByCanvas', 'animate'],
  docs: ['repo/src/content/docs/api/variables/runningAnimations.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/docs/core-concepts.md', 'repo/src/content/docs/api/classes/FabricObject.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

// fabric example: Animation: An animation loop that stops cleanly
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: An animation loop that stops cleanly',
  summary:
    'onComplete restarts the swing until a flag says stop; stopping aborts the trip in flight and cancelByTarget leaves runningAnimations empty.',
  section: 'Animation',
  tags: ['animate', 'abort', 'runningAnimations', 'cancelByTarget'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/docs/core-concepts.md', 'repo/src/content/docs/api/variables/runningAnimations.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeInOutCubic.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

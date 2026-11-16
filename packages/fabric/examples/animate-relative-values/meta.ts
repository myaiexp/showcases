// fabric example: Animation: Relative values without "+="
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Animation: Relative values without "+="',
  summary:
    'The old guide animates to "+=100"; v7 takes only numbers, so the end value is the current value plus a delta read when the animation starts.',
  section: 'Animation',
  tags: ['animate', 'left', 'angle'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/functions/animate.md', 'repo/src/content/docs/api/namespaces/util/namespaces/ease/functions/easeOutCubic.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

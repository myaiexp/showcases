// zephyr3d example: AnimationController: stop, keep, fadeOut and enqueue responses
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'AnimationController: stop, keep, fadeOut and enqueue responses',
  summary:
    'While the figure walks, one response overlays a masked wave with onActive: \'keep\', one queues a jump with enqueue: true until the walk drains, and one interrupts with onActive: { fadeOut }. The log shows each dispatch\'s policy.',
  section: 'Animation',
  tags: ['onActive', 'keep', 'enqueue', 'fadeOut', 'dispatch', 'policy', 'createSkeletalMaskedAnimation'],
  docs: ['repo/apps/doc/web/en/animation-controller.md', 'repo/apps/doc/web/en/animation-skeleton.md', 'repo/apps/doc/web/en/asset-loading.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

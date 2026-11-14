// g6 example: Custom behavior: enable, options and cleanup
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom behavior: enable, options and cleanup',
  summary: 'A custom behavior that grows a clicked node by a step option up to a maximum, honours enable, reports through an onGrow callback and removes its listener in destroy. The card clicks nodes on a loop.',
  section: 'Behavior',
  tags: ['BaseBehavior', 'register', 'enable', 'updateBehavior', 'NodeEvent.CLICK', 'destroy'],
  docs: ['repo/packages/site/docs/manual/behavior/custom-behavior.en.md', 'repo/packages/site/docs/api/behavior.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

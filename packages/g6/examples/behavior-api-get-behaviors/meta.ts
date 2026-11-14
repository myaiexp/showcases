// g6 example: Behavior API: getBehaviors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Behavior API: getBehaviors',
  summary: 'graph.getBehaviors returns the configured behavior list, with each key and option as set or updated; controls change it and the readout prints the result. The card counts the list as it changes.',
  section: 'Behavior',
  tags: ['getBehaviors', 'updateBehavior', 'setBehaviors'],
  docs: ['repo/packages/site/docs/api/behavior.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

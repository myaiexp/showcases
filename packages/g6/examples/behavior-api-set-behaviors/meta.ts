// g6 example: Behavior API: setBehaviors
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Behavior API: setBehaviors',
  summary: 'graph.setBehaviors replaces the behavior list, or derives a new one from the current list with a function; checkboxes add and remove behaviors and the readout shows the list. The card steps through four lists.',
  section: 'Behavior',
  tags: ['setBehaviors', 'getBehaviors', 'behaviors'],
  docs: ['repo/packages/site/docs/api/behavior.en.md', 'repo/packages/site/docs/manual/behavior/overview.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

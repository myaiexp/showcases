// vchart example: Sequence analysis: updating events with updateSpecSync
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence analysis: updating events with updateSpecSync',
  summary:
    'The guide\'s update rule for sequenceAnalysis: time-mode count labels and reference lines are built from the spec, so new events go through a complete updateSpecSync of the saved extension spec, not updateData. A button shifts every event a day and adds to the counts.',
  section: 'Extensions',
  tags: ['updateSpecSync', 'sequenceAnalysis', 'eventData', 'action_count', 'time_stamp'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/sequence_analysis.md',
    'repo/docs/assets/option/en/chart/sequence-analysis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

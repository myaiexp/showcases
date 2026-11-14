// vchart example: Sequence analysis: time mode with target avatars
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Sequence analysis: time mode with target avatars',
  summary:
    'In time mode the events sit at their millisecond timestamps, the top axis sums action_count per timestamp, and actionData links them. actionTarget adds a midpoint avatar from actionData.user_image and an arrow at the target; the card toggles it.',
  section: 'Extensions',
  tags: ['mode time', 'actionTarget', 'actionData', 'user_image', 'action_count', 'sequenceAnalysis'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/sequence_analysis.md',
    'repo/docs/assets/option/en/chart/sequence-analysis.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

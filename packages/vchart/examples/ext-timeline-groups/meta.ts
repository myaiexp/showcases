// vchart example: Timeline: grouped timelines with seriesField
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline: grouped timelines with seriesField',
  summary:
    'seriesField splits the events into groups, so a product timeline and a team timeline each get their own row and dot colour. A select moves the labels above or below.',
  section: 'Extensions',
  tags: ['timeline', 'seriesField', 'labelPosition', 'group'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/timeline.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

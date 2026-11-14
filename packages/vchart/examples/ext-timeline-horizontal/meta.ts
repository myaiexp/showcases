// vchart example: Timeline: horizontal events and label positions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Timeline: horizontal events and label positions',
  summary:
    'The timeline extension chart lays events on a time line from left to right: timeField orders them, eventField and subTitleField label them, and labelPosition puts the text above, below or alternating. A select changes labelPosition and a slider the arrow thickness.',
  section: 'Extensions',
  tags: ['timeline', 'registerTimelineChart', 'event series', 'labelPosition', 'timeField', 'eventField', 'arrow'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Extensions/timeline.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

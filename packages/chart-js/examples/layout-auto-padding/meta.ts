// Chart.js example: Room for big points: autoPadding
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Room for big points: autoPadding',
  summary:
    'With layout.autoPadding on, the chart leaves enough room that points sitting on the edge of the axes are drawn whole. Turn it off and the big points in the corners are cut off by the canvas edge.',
  section: 'Configuration',
  tags: ['layout', 'autoPadding', 'point', 'clip'],
  docs: ['repo/docs/configuration/layout.md', 'repo/docs/configuration/elements.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

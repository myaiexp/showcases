// Chart.js example: Which bar did I click?
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Which bar did I click?',
  summary:
    "In an onClick handler, getElementsAtEventForMode() with 'nearest' and intersect: true returns the bar under the click, giving you its label and value.",
  section: 'Developers',
  tags: ['onClick', 'getElementsAtEventForMode', 'interaction', 'bar'],
  docs: ['repo/docs/developers/api.md', 'repo/docs/configuration/interactions.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Waterfall: stack labels and leader lines
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waterfall: stack labels and leader lines',
  summary:
    'stackLabel.position (withChange, middle, max, min) and valueType (change or absolute) control the label on every step, and leaderLine.style restyles the connector. Two selects switch the settings.',
  section: 'Bar',
  tags: ['stackLabel.position', 'stackLabel.valueType', 'leaderLine.style'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Waterfall.md',
    'repo/docs/assets/option/en/series/waterfall.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

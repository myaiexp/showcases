// vchart example: Tooltip activeType: mark and dimension
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip activeType: mark and dimension',
  summary:
    'A grouped bar chart whose tooltip is a mark tooltip (one bar), a dimension tooltip (every bar of the category) or both, chosen with tooltip.activeType. The card alternates showTooltip and setDimensionIndex to show each kind without a pointer.',
  section: 'Concepts: Components',
  tags: ['tooltip.activeType', 'showTooltip', 'setDimensionIndex', 'mark', 'dimension'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Tooltip.md',
    'repo/docs/assets/option/en/component/tooltip.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

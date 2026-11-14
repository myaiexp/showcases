// vchart example: Crosshair on a radar chart
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Crosshair on a radar chart',
  summary:
    'In a polar chart the crosshair uses categoryField (spokes at the angle axis) and valueField (rings on the radius axis). Hover the full view to see it; a card has no pointer, so it only morphs the radar.',
  section: 'Concepts: Components',
  tags: ['crosshair.categoryField', 'crosshair.valueField', 'radar'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Crosshair.md',
    'repo/docs/assets/option/en/component/crosshair.md',
    'repo/docs/assets/option/en/component/crosshair-common/crosshair-line.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

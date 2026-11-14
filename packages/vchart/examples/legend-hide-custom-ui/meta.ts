// vchart example: Hidden legend with a custom checkbox UI
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hidden legend with a custom checkbox UI',
  summary:
    'The built-in legend is hidden with legends.visible false and replaced by DOM checkboxes that call setLegendSelectedDataByIndex; getLegendSelectedDataByIndex still lists the invisible legend\'s items. This is the UI customization pattern from the Legend page.',
  section: 'Concepts: Components',
  tags: ['legends.visible', 'getLegendSelectedDataByIndex', 'setLegendSelectedDataByIndex'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Legend.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

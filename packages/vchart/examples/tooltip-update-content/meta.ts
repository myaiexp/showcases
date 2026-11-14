// vchart example: Tooltip updateContent and updateTitle callbacks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Tooltip updateContent and updateTitle callbacks',
  summary:
    'Callbacks on tooltip.dimension that rewrite the computed tooltip lines before they show: updateContent sorts the lines and appends a Total row, updateTitle rewrites the title. Compare with the default tooltip in the full view.',
  section: 'Concepts: Components',
  tags: ['updateContent', 'updateTitle', 'tooltip.dimension', 'stack'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Tooltip.md',
    'repo/docs/assets/option/en/component/tooltip.md',
    'repo/docs/assets/option/en/component/tooltip-common/tooltip-pattern.md',
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

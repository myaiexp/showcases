// vchart example: markArea ranges on x and y
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'markArea ranges on x and y',
  summary:
    'Annotated areas: markArea with x / x1 as a band across categories, y / y1 as a band across values, both together, and a rectangle from four coordinates; each with an area style and label.',
  section: 'Concepts: Components',
  tags: ['markArea', 'x', 'x1', 'y', 'y1', 'coordinates', 'area', 'label'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/marker.md',
    'repo/docs/assets/option/en/component/mark-area.md',
    'repo/docs/assets/option/en/component/marker-common/marker-data-point.md',
    'repo/docs/assets/option/en/component/marker-common/marker-label.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Vertical DataZoom with roam and span limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vertical DataZoom with roam and span limits',
  summary:
    'A DataZoom on the right of a horizontal bar chart, with roamDrag, roamZoom or roamScroll letting the chart body move or resize the window, and minSpan / maxSpan limiting its size.',
  section: 'Concepts: Components',
  tags: ['dataZoom', 'orient', 'roamDrag', 'roamZoom', 'roamScroll', 'minSpan', 'maxSpan'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Datazoom.md',
    'repo/docs/assets/option/en/component/data-zoom.md',
    'repo/docs/assets/option/en/component/data-filter-component-common/data-filter-base-component.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

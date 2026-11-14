// vchart example: Scrollbar range, startValue and endValue
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Scrollbar range, startValue and endValue',
  summary:
    'A ScrollBar under a 36-month bar chart: startValue and endValue give the visible window as category values, roamDrag / roamZoom / roamScroll let the chart body move it, and scrollBarChange reports the window. Note that the Scrollbar page\'s `roam` option is not in the 2.2.2 types.',
  section: 'Concepts: Components',
  tags: ['scrollBar', 'startValue', 'endValue', 'roamDrag', 'scrollBarChange'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Scrollbar.md',
    'repo/docs/assets/option/en/component/scrollbar.md',
    'repo/docs/assets/option/en/component/data-filter-component-common/data-filter-base-component.md',
    'repo/docs/assets/api/en/API/event.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

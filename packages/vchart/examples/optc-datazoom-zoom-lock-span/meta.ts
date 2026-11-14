// vchart example: DataZoom zoomLock, minSpan and maxSpan
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "DataZoom zoomLock, minSpan and maxSpan",
  summary: "A dataZoom window can be locked to its current size with zoomLock, or free but bounded by minSpan and maxSpan. The window is driven from code across the chart; the locked window only slides, the free one is clamped.",
  section: "Option: Components",
  tags: ["dataZoom.zoomLock","minSpan","maxSpan","setStartAndEnd"],
  docs: [
    'repo/docs/assets/option/en/component/data-filter-component-common/data-filter-base-component.md',
    'repo/docs/assets/option/en/component/data-zoom.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

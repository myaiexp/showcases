// vchart example: Legend with a scrollbar pager and lazy loading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Legend with a scrollbar pager and lazy loading",
  summary: "A legend of sixty items pages through a scrollbar pager. lazyload defers drawing the items that are out of view; a slider moves the legend's page.",
  section: "Option: Components",
  tags: ["legends.lazyload","pager.type","scrollbar","maxHeight"],
  docs: [
    'repo/docs/assets/option/en/component/legend-discrete.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

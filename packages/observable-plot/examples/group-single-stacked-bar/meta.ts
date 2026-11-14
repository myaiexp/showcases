// observable-plot example: Group: single stacked bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Group: single stacked bar',
  summary:
    'groupZ with the proportion reducer builds one stacked bar of sport shares; an explicit stackX with order and a filter after it keep labels on the big segments.',
  section: 'Transform: Group',
  tags: ['barX', 'text', 'groupZ', 'proportion', 'stackX', 'filter'],
  docs: ['repo/docs/transforms/group.md', 'repo/docs/transforms/filter.md', 'repo/docs/data/olympians.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

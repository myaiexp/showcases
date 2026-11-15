// vega example: Group: Small Multiples with Titles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: Small Multiples with Titles",
  summary:
    "A faceted group mark repeats a panel for each series. Every panel draws its own local axis and a group-relative label, and a shared signal grows the bars across all panels together.",
  section: "Mark Types",
  tags: ['marks.group.axes','marks.from.facet','marks.group.cornerRadius'],
  docs: ['repo/docs/docs/marks/group.md', 'repo/docs/docs/marks/group.vg.json', 'repo/docs/docs/marks.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

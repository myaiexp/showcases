// vega example: Sorting Mark Items
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Sorting Mark Items",
  summary:
    "Eight overlapping discs are drawn in the order of their radius: ascending paints the largest last (on top), descending the smallest last. The comparator reads the datum, and its order is a signal.",
  section: "Marks",
  tags: ['marks.sort','marks.sort.order','signal.bind'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

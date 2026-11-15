// embedding-atlas example: group and color encodings split a line into series
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group and color attributes",
  summary:
    "A line of document counts per words bin. group alone splits it into one line per topic in a single color; color splits and colors them; the last variant groups by source while coloring by topic.",
  section: "Charts",
  tags: ['encoding.group', 'encoding.color', 'mark: line'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

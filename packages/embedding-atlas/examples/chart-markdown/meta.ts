// embedding-atlas example: a markdown chart spec with content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Markdown chart",
  summary:
    "A { type: \"markdown\", content } entry puts a note on the dashboard: headings, lists, emphasis, code and a table. It is a chart in the dashboard grid like any other, next to a topic count plot.",
  section: "Charts",
  tags: ['markdown', 'content', 'title'],
  docs: [
    'repo/packages/viewer/src/charts/basic/types.ts',
    'repo/packages/viewer/src/charts/chart_types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

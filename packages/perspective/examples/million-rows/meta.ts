// Perspective example: A million rows in the browser
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A million rows in the browser",
  summary:
    "A 50,000-row columnar batch exported once with to_arrow() and appended until the table holds a million rows (100,000 in the card). Then time a sort, a pivot, a filter and a scatter over all of it.",
  section: "Use Cases",
  tags: ["Arrow", "to_arrow", "columnar", "large data", "update", "performance"],
  docs: ["repo/docs/md/use_cases/large_datasets.md", "repo/docs/md/explanation/table/loading_data.md"],
  provenance: 'pure',
  added: '2026-11-13',
});

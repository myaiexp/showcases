// embedding-atlas example: the url renderer turning strings into links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "URL column as links",
  summary:
    "A column of https://example.com/... strings with and without { renderer: \"url\" }. With it each cell is a clickable link that opens in a new tab; nothing is fetched.",
  section: "Data Formats",
  tags: ['columnStyles', 'renderer: url'],
  docs: [
    'repo/packages/docs/data-formats.md',
    'repo/packages/viewer/src/renderers/renderer_types.ts',
    'repo/packages/viewer/src/renderers/types.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

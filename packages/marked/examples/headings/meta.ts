// marked example: Headings: # to ######
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Headings: # to ######",
  summary:
    'Lines starting with one to six # signs become headings, from the biggest title down to the smallest. marked.parse() turns each into an h1 to h6 tag.',
  section: 'Supported Markdown',
  tags: ['heading','# ATX','h1-h6'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

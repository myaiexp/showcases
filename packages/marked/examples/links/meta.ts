// marked example: Links
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Links",
  summary:
    'Text in [brackets] followed by an address in (parentheses) becomes a clickable link, and a quoted title after the address becomes a tooltip. Marked outputs an a tag.',
  section: 'Supported Markdown',
  tags: ['link','title','a'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Renderer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

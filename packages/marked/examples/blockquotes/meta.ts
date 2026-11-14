// marked example: Blockquotes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Blockquotes",
  summary:
    'Lines starting with > become an indented quote, like replying to an email. Put a second > for a quote inside a quote, and other Markdown still works inside.',
  section: 'Supported Markdown',
  tags: ['blockquote','>'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/Renderer.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

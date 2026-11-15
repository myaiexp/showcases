// d2 example: Comments
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Comments',
  summary:
    'A `#` starts a line comment that runs to the end of the line, either on its own line or after code. A block comment sits between two `"""` lines. Comments are dropped at compile time, so the diagram shows only the shapes.',
  section: 'Comments',
  tags: ['comments'],
  docs: ['repo/docs/tour/comments.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

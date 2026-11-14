// Zod example: The error as a printable block
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The error as a printable block',
  summary:
    'z.prettifyError returns one string: a line starting with a cross for each issue and an arrow line naming its path. Handy for logs and command-line tools; three config files are shown with their output.',
  section: 'Formatting errors',
  tags: ['z.prettifyError', 'strictObject', 'issues'],
  docs: ['repo/packages/docs/content/error-formatting.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

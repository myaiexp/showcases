// marked example: The invisible character that breaks a heading
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'The invisible character that breaks a heading',
  summary:
    'An invisible character (often added by text editors) before a # makes the heading render as plain text. The one-line replace() strips it. The text is shown with the hidden characters spelled out so you can see them.',
  section: 'Usage',
  tags: ['zero width', 'BOM', 'FEFF', 'marked.parse'],
  docs: ['repo/docs/INDEX.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

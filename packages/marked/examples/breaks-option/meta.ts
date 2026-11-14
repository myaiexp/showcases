// marked example: Line breaks: breaks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line breaks: breaks',
  summary:
    'The same short lines rendered twice. Standard Markdown joins lines that have no blank line between them into one paragraph; with breaks: true each line stays on its own, the way chat and comment boxes behave.',
  section: 'Options',
  tags: ['breaks', 'new Marked', 'options'],
  docs: ['repo/docs/USING_ADVANCED.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

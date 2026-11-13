// Marked example: Markdown editor with a sanitized live preview
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Live Markdown editor',
  summary:
    'Type Markdown on the left and see rendered HTML on the right, re-parsed on every keystroke with marked.parse() and sanitized by DOMPurify before it touches the DOM.',
  section: 'Basics',
  tags: ['GFM', 'tables', 'task lists', 'DOMPurify'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});

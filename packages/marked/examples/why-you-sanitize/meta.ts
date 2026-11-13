// Marked example: raw Marked output versus DOMPurify-cleaned HTML
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why you sanitize',
  summary:
    'Markdown allows inline HTML, so a hostile string passes through Marked untouched. Compare the exact HTML Marked emits with what DOMPurify keeps; only the sanitized version is rendered.',
  section: 'Basics',
  tags: ['XSS', 'DOMPurify', 'sanitize'],
  docs: [],
  provenance: 'legacy',
  added: '2026-06-14',
});

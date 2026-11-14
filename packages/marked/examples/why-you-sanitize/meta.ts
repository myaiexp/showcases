// marked example: Why you sanitize
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Why you sanitize',
  summary:
    'A comment with hidden HTML (an image whose onerror runs code, a script tag, a javascript: link) passes through Marked untouched, painted red here. DOMPurify.sanitize() on the output removes it before anything reaches the page.',
  section: 'Usage',
  tags: ['XSS', 'DOMPurify', 'sanitize'],
  docs: ['repo/docs/INDEX.md', 'repo/README.md'],
  provenance: 'pure',
  added: '2026-06-14',
});

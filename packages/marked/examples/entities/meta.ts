// marked example: HTML entities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "HTML entities",
  summary:
    'Codes such as &copy; or &#9731; become symbols, and a bare & or < in your text is made safe for you. Marked keeps real entities and escapes the stray ones.',
  section: 'Supported Markdown',
  tags: ['entity','&amp;','character reference'],
  docs: ['repo/docs/INDEX.md','repo/src/rules.ts','repo/src/helpers.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

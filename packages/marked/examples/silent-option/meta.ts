// marked example: When parsing fails: silent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When parsing fails: silent',
  summary:
    'A small extension that throws when it meets {{weather}}. With silent: false the error escapes parse() and shows red; with silent: true Marked returns an HTML error message instead, so the page still renders something.',
  section: 'Options',
  tags: ['silent', 'errors', 'extensions'],
  docs: ['repo/docs/USING_ADVANCED.md', 'repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

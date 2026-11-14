// ky example: url-encoded-form
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send a form as one line (URLSearchParams)',
  summary:
    'Some servers want the classic form format: every field on a single line as name=value pairs. Pass a URLSearchParams as the body and Ky sends that format, labelled application/x-www-form-urlencoded. Spaces and symbols in your values are spelled out so they cannot be mistaken for separators, and the server turns them back.',
  section: 'Tips',
  tags: ['URLSearchParams', 'application/x-www-form-urlencoded', 'body', 'form'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

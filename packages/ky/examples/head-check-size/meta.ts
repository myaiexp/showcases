// ky example: ky.head reads headers without the body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check a file without downloading it',
  summary:
    'Before downloading a big file you may want to know how large it is or what type it is. ky.head sends a HEAD request, which the server answers with the same headers as a normal request but no file, so you learn the size in one short round trip.',
  section: 'Requests',
  tags: ['ky.head', 'HEAD', 'content-length', 'headers'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

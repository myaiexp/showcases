// ky example: no download progress for 204 and HEAD
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No body, no progress',
  summary:
    'A progress bar needs something to measure. Answers without a body, such as "204 No Content" and the reply to a HEAD request, give Ky nothing to stream, so onDownloadProgress is never called for them. Your page should expect that and not leave a bar waiting at zero.',
  section: 'Progress',
  tags: ['onDownloadProgress', '204', 'HEAD', 'empty body'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

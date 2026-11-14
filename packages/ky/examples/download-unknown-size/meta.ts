// ky example: totalBytes 0 for a compressed download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Progress when the size is unknown',
  summary:
    'A compressed answer is unpacked on the way in, so the size announced by the server no longer matches the bytes you receive. Ky then reports totalBytes as 0 until the download completes, and the honest progress bar is a "busy" bar with a byte count instead of a percentage.',
  section: 'Progress',
  tags: ['onDownloadProgress', 'totalBytes', 'content-encoding', 'gzip', 'unknown size'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

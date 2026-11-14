// ky example: onDownloadProgress drives a progress bar
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A progress bar for downloads',
  summary:
    'A large download with no sign of life looks like a frozen page. Give Ky an onDownloadProgress function and it calls you as the file arrives, with the percentage, the bytes so far and the total, which is all a progress bar needs.',
  section: 'Progress',
  tags: ['onDownloadProgress', 'progress bar', 'download', 'content-length'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

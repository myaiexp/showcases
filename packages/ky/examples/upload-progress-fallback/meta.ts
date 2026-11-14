// ky example: retry an upload without onUploadProgress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry an upload without the progress bar',
  summary:
    'Streaming an upload only works on some connections, and where it does not the whole upload fails with a network error. The readme\'s recipe: in beforeRetry, spot the NetworkError and return {options: {onUploadProgress: undefined}}, so the second try goes out as a plain upload and still succeeds.',
  section: 'Progress',
  tags: ['onUploadProgress', 'beforeRetry', 'NetworkError', 'retry', 'upload'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

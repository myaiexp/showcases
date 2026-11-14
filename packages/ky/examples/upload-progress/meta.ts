// ky example: onUploadProgress with a streamed body
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A progress bar for uploads',
  summary:
    'Sending a large file with no feedback makes people click twice. onUploadProgress tells you how much has left your page. It needs a browser that can stream request bodies (Chrome and Edge can, Firefox cannot): where it cannot, Ky skips the callback without a word, so this example says so and shows what the server received instead.',
  section: 'Progress',
  tags: ['onUploadProgress', 'upload', 'request streams', 'Firefox', 'progress bar'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

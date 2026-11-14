// ky example: the chunk argument of onDownloadProgress
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Watching a file arrive in pieces',
  summary:
    'Downloads do not arrive in one lump but as a series of pieces. Besides the totals, onDownloadProgress hands you each piece (a Uint8Array) as it comes in, so you can inspect it or draw it. Here every piece of the file lights up a slot, coloured by its data.',
  section: 'Progress',
  tags: ['onDownloadProgress', 'chunk', 'Uint8Array', 'streaming'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

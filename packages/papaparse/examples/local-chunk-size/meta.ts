// Papa Parse example: Papa.LocalChunkSize is the default slice size for files
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Set the default chunk size for files',
  summary:
    'Papa.LocalChunkSize is the slice size every streamed local file uses unless a call sets its own chunkSize. The default is 10 MB. It is one setting for the whole page, so change it, start your parse, and put the old value back.',
  section: 'Extras',
  tags: ['Papa.LocalChunkSize', 'chunkSize', 'chunk', 'File'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html'],
  provenance: 'pure',
  added: '2026-11-14',
});

// Papa Parse example: Papa.RemoteChunkSize sets the slice size of downloads
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Set the default chunk size for downloads',
  summary:
    'Papa.RemoteChunkSize is how many bytes each Range request asks for when a download is streamed. The default is 5 MB. It is one setting for the whole page, so change it, start your download, and put the old value back. Without a chunk or step callback the file comes in one request and the setting is ignored.',
  section: 'Extras',
  tags: ['Papa.RemoteChunkSize', 'chunkSize', 'chunk', 'download', 'Range'],
  docs: ['repo/docs/docs.html', 'repo/docs/faq.html', 'repo/papaparse.js'],
  provenance: 'pure',
  added: '2026-11-14',
});

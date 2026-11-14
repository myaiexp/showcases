// Papa Parse example: stream a remote file in pieces with HTTP Range requests
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Stream a big download in pieces',
  summary:
    'Combine download, chunk and chunkSize and Papa fetches a remote file one slice at a time, using HTTP Range requests, handing you the rows of each slice as it lands. The server needs to support ranges. The server here is a stand-in inside the page.',
  section: 'FAQ',
  tags: ['download', 'chunk', 'chunkSize', 'Range', 'Content-Range', 'streaming'],
  docs: ['repo/docs/faq.html', 'repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});

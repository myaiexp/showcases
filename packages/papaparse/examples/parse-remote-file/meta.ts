// Papa Parse example: download a CSV from a URL and parse it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parse a file from a server',
  summary:
    'Give Papa a web address instead of text and set download: true. It fetches the file and hands the rows to your complete callback. The request and the answer are drawn as they happen (the server is a stand-in inside the page).',
  section: 'Convert CSV to JSON',
  tags: ['Papa.parse', 'download', 'complete', 'URL'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});

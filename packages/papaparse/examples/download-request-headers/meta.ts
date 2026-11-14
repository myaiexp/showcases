// Papa Parse example: downloadRequestHeaders sends a token with the download
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Send a login token with the download',
  summary:
    'Some files are only handed to people who prove who they are. downloadRequestHeaders adds headers, such as an Authorization token, to the request Papa makes. Without it the server says no and Papa calls your error callback. The server here is a stand-in inside the page.',
  section: 'Parse config',
  tags: ['download', 'downloadRequestHeaders', 'error', 'complete'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});

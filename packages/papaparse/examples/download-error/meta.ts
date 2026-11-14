// Papa Parse example: a failed download calls the error callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A missing file reaches the error callback',
  summary:
    'When the server answers with an error such as 404 Not Found or 500, Papa does not call complete with empty rows. It calls your error callback with the reason, so you can tell the reader what went wrong. The server here is a stand-in inside the page.',
  section: 'Parse config',
  tags: ['download', 'error', 'complete', 'HTTP status'],
  docs: ['repo/docs/docs.html', 'repo/docs/index.html'],
  provenance: 'pure',
  added: '2026-11-14',
});

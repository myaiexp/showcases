// Perspective example: several Web Worker engines and Clients
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Workers and clients',
  summary:
    'perspective.worker() starts a Web Worker running its own copy of the engine and returns the Client for it. Two workers host two separate tables, each listed by get_hosted_table_names(), and a table opened through the wrong Client is simply not there.',
  section: 'Engine Library',
  tags: ['worker', 'Client', 'get_hosted_table_names', 'open_table', 'terminate', 'Web Worker'],
  docs: [
    'repo/docs/md/how_to/javascript/worker.md',
    'repo/docs/md/how_to/javascript/loading_data.md',
    'repo/docs/md/how_to/javascript/deleting.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

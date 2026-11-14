// Fix the request and send it again example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Fix the request and send it again',
  summary:
    'A catcher also receives the original request. Here the first try carries an old password and gets a 401; the catcher fetches the current password and sends the same request again. The two requests sit side by side, differing only in their login.',
  section: 'Catchers',
  tags: ['unauthorized', 'basicAuth', 'fetch', 'text', 'json'],
  docs: ['repo/README.md', 'repo/src/addons/basicAuth.ts', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

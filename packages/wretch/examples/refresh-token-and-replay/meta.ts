// Refresh a token and try again: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Refresh a token and try again',
  summary:
    'The saved password has expired, so the server answers 401. A handler on the client fetches a fresh one and replays the very same request with it. The wire shows 401, then the renewal, then 200, and the app just shows the account as if nothing had gone wrong.',
  section: 'Usage',
  tags: ['unauthorized', 'resolve', 'basicAuth', 'BasicAuthAddon', 'replay', 'fetch'],
  docs: ['repo/README.md', 'repo/src/addons/basicAuth.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

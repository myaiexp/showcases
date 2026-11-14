// ky example: context passes data to hooks without touching the request
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pass a token to a hook with context',
  summary:
    'Sometimes a hook needs something the request must not carry itself, such as a login token or a label for logging. The context option is a private note you attach to a call: every hook can read it, the server never sees it. Here a hook turns the token into an Authorization header, and does nothing when there is none.',
  section: 'Fetch and context',
  tags: ['context', 'hooks.beforeRequest', 'authorization', 'options.context'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

// ky example: before-request-rewrite-url
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRequest: swap in a new request',
  summary:
    'Sometimes the change you need is not a header but the address itself. A beforeRequest hook can hand back a brand-new Request, and that is what Ky sends: here the hook adds a secret token to the address of a report download.',
  section: 'Hooks',
  tags: ['beforeRequest', 'Request', 'URL', 'token'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

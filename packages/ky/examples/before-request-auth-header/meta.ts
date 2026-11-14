// ky example: before-request-auth-header
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'beforeRequest: add a login header',
  summary:
    'Private pages need proof of who is asking, usually a token in the Authorization header. A beforeRequest hook gets the finished request just before it leaves, so it can stamp the header on without the calling code ever touching it.',
  section: 'Hooks',
  tags: ['beforeRequest', 'authorization', 'headers'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

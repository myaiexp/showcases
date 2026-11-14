// Zod example: an async refine checks a username against a pretend server
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Check a username with a server',
  summary:
    'Some checks need to wait for an answer, like asking a server whether a username is taken. An async refine does that, and safeParseAsync waits for it: the field shows "checking…" while the pretend server thinks, then ✓ or "That username is taken".',
  section: 'Basic usage',
  tags: ['safeParseAsync', 'refine', 'async'],
  docs: ['repo/packages/docs/content/basics.mdx', 'repo/packages/docs/content/api.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

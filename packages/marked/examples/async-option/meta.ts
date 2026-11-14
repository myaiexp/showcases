// marked example: Waiting for the result: async
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Waiting for the result: async',
  summary:
    'A link-title lookup that takes a moment. With async: true the extension may await, so parse() returns a Promise that stays pending, then resolves to the finished page; the status line shows each step.',
  section: 'Options',
  tags: ['async', 'walkTokens', 'Promise'],
  docs: ['repo/docs/USING_ADVANCED.md', 'repo/docs/USING_PRO.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

// ky example: hooks-serial-async
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Async hooks run one at a time',
  summary:
    'A hook can take its time: look something up, wait for a token, sign the request. When you give Ky several hooks they run one after another, never together, and the request waits for the last one. Drag the slider to see how slow hooks delay the trip.',
  section: 'Hooks',
  tags: ['hooks', 'async', 'beforeRequest', 'serial'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

// ky example: init-hook-own-copies
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'init: changes stay with one request',
  summary:
    'A hook that edits your options could, in principle, leak the edit into the next request. Ky hands init its own copy of headers, search params and similar, so each request starts clean. The one thing it does not copy is a request body, so editing that in place repeats on every send.',
  section: 'Hooks',
  tags: ['init', 'headers', 'body', 'URLSearchParams'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

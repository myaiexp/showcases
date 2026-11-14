// ky example: init-hook-api-key
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'init: a key on every address',
  summary:
    'Many services want an API key in the address of every request, and repeating it in each call invites a forgotten one. An init hook adds it once, before the request is built, so every call from that client carries it.',
  section: 'Hooks',
  tags: ['init', 'searchParams', 'api key'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

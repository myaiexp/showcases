// ky example: rate-limit headers as a fallback for Retry-After
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Other rate-limit headers',
  summary:
    'Not every API says "wait" with Retry-After: some say when your allowance resets, as seconds or as a clock timestamp. Ky understands the common ones (RateLimit-Reset, X-RateLimit-Reset and friends) and waits accordingly. If Retry-After is also there, it wins.',
  section: 'Retry',
  tags: ['RateLimit-Reset', 'X-RateLimit-Reset', 'X-RateLimit-Retry-After', '429', 'Unix timestamp'],
  docs: ['repo/readme.md', 'repo/source/types/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

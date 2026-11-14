// No catcher? Then the promise rejects example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No catcher? Then the promise rejects',
  summary:
    'Catchers are optional, but a failure never disappears. With no catcher, a 500 makes the promise reject with an error, and the code after the await is skipped. With a catcher that returns something, the same failure becomes a normal result.',
  section: 'Catchers',
  tags: ['internalError', 'json', 'WretchError'],
  docs: ['repo/README.md', 'repo/src/resolver.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

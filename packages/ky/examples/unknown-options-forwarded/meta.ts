// ky example: unknown options are forwarded to fetch
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Extra options reach fetch',
  summary:
    'Frameworks add their own switches to fetch, such as Next.js with its next option. Ky does not need to know them: every option it does not recognize is passed to fetch as an extra argument, while standard ones such as cache go into the request and Ky\'s own, such as timeout, stay inside Ky. A custom fetch shows exactly what arrives where.',
  section: 'Fetch and context',
  tags: ['fetch', 'next', 'cache', 'priority', 'RequestInit'],
  docs: ['repo/readme.md', 'repo/source/types/options.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

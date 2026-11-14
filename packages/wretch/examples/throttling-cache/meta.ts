// Serve repeat requests from a cache: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serve repeat requests from a cache',
  summary:
    'The app asks for the same post again and again, six times in under two seconds. throttlingCache() remembers the first answer for one second: the first call and the first call after that second is up go to the server, the others are answered at once from memory, and the timeline marks each "cache hit".',
  section: 'Middlewares',
  tags: ['throttlingCache', 'throttle', 'middlewares'],
  docs: ['repo/README.md', 'repo/src/middlewares/throttlingCache.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

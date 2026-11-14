// One handler for several codes example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One handler for several codes',
  summary:
    'Pass a list of statuses to .catcher() and one handler covers all of them. Here 401 and 403 share a "go sign in" handler, while a 404 is not on the list and falls through.',
  section: 'Catchers',
  tags: ['catcher', 'json'],
  docs: ['repo/README.md', 'repo/src/types.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

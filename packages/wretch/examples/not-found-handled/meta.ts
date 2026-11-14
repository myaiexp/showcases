// When a post is missing: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'When a post is missing',
  summary:
    'Ask for a post that does not exist and the server says 404. Instead of crashing, .notFound() runs and the app shows a friendly "Post not found!" while .json() is skipped. Existing posts go the normal way.',
  section: 'Quick start',
  tags: ['notFound', 'catcher', 'json', 'get'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

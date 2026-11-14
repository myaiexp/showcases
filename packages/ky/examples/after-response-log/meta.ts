// ky example: after-response-log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'afterResponse: watch every answer',
  summary:
    'To see what your app really receives, you can log every answer in one place instead of in every call. An afterResponse hook sees each answer, good or bad, and may read its body without disturbing what your own code gets.',
  section: 'Hooks',
  tags: ['afterResponse', 'logging', 'clone'],
  docs: ['repo/readme.md', 'repo/source/types/hooks.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

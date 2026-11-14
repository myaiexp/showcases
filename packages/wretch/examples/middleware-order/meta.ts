// Middlewares run in order: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Middlewares run in order',
  summary:
    'The first middleware in the list is the outermost layer: the request goes through log, then delay, then short-circuit, and the answer comes back the same way in reverse. Put the short-circuit first and it answers before the others ever see the request, so they stay dark. The row lights each middleware as it runs and the list below numbers the steps.',
  section: 'Writing a middleware',
  tags: ['middlewares', 'next', 'order'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

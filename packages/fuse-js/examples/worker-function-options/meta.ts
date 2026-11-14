// Fuse.js example: the options FuseWorker refuses, and the error each one raises
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'What a worker cannot take',
  summary:
    'Functions cannot be sent to a Web Worker, so FuseWorker refuses sortFn, getFn and a key\'s getFn the moment it is created, with a clear message, and refuses token search too. Each option is tried in turn; the same options work in plain Fuse.',
  section: 'Web Workers',
  tags: ['FuseWorker', 'sortFn', 'getFn', 'keys.getFn', 'useTokenSearch', 'tokenize'],
  docs: ['repo/docs/web-workers.md', 'repo/src/workers/FuseWorker.ts', 'repo/src/core/errorMessages.ts', 'repo/docs/token-search.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

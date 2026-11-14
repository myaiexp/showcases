// marked example: Parsing in a worker with a time limit
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Parsing in a worker with a time limit',
  summary:
    'Marked runs in a Web Worker so a huge or hostile document cannot freeze the page. If the worker is not done within the time limit, the page terminates it and says so. Resize the document and the limit and run it.',
  section: 'Workers',
  tags: ['Web Worker', 'terminate', 'timeout', 'ReDoS'],
  docs: ['repo/docs/USING_ADVANCED.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

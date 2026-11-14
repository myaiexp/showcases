// Pass data out of a middleware: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pass data out of a middleware',
  summary:
    'A middleware cannot return extra information next to the answer, but it can write into an object you hand it. You pass a context object through .options(), the middleware fills in what it noticed (which address it called, what status came back, how long it took), and your code reads it afterwards. The panel shows the object empty before, filled after.',
  section: 'Writing a middleware',
  tags: ['middlewares', 'options', 'context'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

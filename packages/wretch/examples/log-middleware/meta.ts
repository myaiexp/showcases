// Write your own middleware: a logger: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Write your own middleware: a logger',
  summary:
    'A middleware is just a function that receives the next step and returns a function that sees every request on its way out. This one writes one line (method@address) to a console box and then passes the request on unchanged, so the server receives exactly what the logger saw.',
  section: 'Writing a middleware',
  tags: ['middlewares', 'ConfiguredMiddleware', 'next'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

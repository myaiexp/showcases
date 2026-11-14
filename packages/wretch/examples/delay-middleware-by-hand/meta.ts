// A middleware you configure: waiting: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'A middleware you configure: waiting',
  summary:
    'Some middlewares take a setting, so they are a function that returns the middleware: delayMiddleware(ms). Two clients are built from the same few lines with different numbers, and both ask at the same instant. The timeline shows the quick one leaving almost at once and the slow one leaving much later, because each held its own request back.',
  section: 'Writing a middleware',
  tags: ['middlewares', 'Middleware', 'ConfiguredMiddleware'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

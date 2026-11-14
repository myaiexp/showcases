// Retry with the defaults: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Retry with the defaults',
  summary:
    'The server is busy and answers 503 twice before it works. With retry() and no options, wretch waits half a second, tries again, waits a full second, tries again, and the app only ever sees the good answer. The timeline shows each try as a bar and the growing gaps between them.',
  section: 'Middlewares',
  tags: ['retry', 'middlewares', 'delayTimer', 'delayRamp'],
  docs: ['repo/README.md', 'repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

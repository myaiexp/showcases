// Keep the last answer when giving up: wretch example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Keep the last answer when giving up',
  summary:
    'The server stays down, with a helpful note in its 503 answer. When retry() runs out of tries it normally throws a bare "Number of attempts exceeded" error and the note is lost. With resolveWithLatestResponse it hands over the last real answer instead, so your usual .catcher(503) handler can show the server\'s own message.',
  section: 'Middlewares',
  tags: ['retry', 'resolveWithLatestResponse', 'maxAttempts', 'catcher', 'middlewares'],
  docs: ['repo/src/middlewares/retry.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

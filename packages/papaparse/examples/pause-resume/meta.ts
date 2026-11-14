// Papa Parse example: pause the parse while slow work happens, then resume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Pause the parse while slow work happens',
  summary:
    'Your step function can call parser.pause() to hold the parse still, do something slow such as a lookup on a server, and call parser.resume() when it is done. Papa waits for you. parser.abort() ends it for good. (Not available with a worker.)',
  section: 'FAQ',
  tags: ['step', 'parser.pause', 'parser.resume', 'parser.abort', 'complete'],
  docs: ['repo/docs/faq.html', 'repo/docs/docs.html'],
  provenance: 'pure',
  added: '2026-11-14',
});

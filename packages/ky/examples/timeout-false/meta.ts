// ky example: timeout false switches the clock off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'No timeout at all',
  summary:
    'Some requests really are slow, such as generating a big report, and a clock would cut them off. `timeout: false` switches it off so Ky waits as long as the server takes. The catch: a server that never answers keeps you waiting for ever, so the demo gives you a Stop button.',
  section: 'Timeouts and limits',
  tags: ['timeout', 'timeout: false', 'AbortController', 'signal'],
  docs: ['repo/readme.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

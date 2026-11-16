// aframe example: utils.throttleTick: a tick handler that runs every 500 ms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.throttleTick: a tick handler that runs every 500 ms',
  summary:
    'A component replaces its own tick with throttleTick(this.tick, 500, this), so the box rotates in 30 degree steps twice a second. The board counts how often the tick body actually ran.',
  section: 'Core API',
  tags: ['AFRAME.utils.throttleTick', 'tick', 'time', 'timeDelta'],
  docs: ['repo/docs/core/utils.md', 'repo/docs/introduction/best-practices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

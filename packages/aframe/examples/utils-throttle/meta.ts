// aframe example: utils.throttle: once a second from a per-frame tick
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.throttle: once a second from a per-frame tick',
  summary:
    'The docs\' foo component calls a throttled everySecond from tick. The board counts frames against throttled calls, and the box changes colour with each throttled call.',
  section: 'Core API',
  tags: ['AFRAME.utils.throttle', 'tick', 'context'],
  docs: ['repo/docs/core/utils.md', 'repo/docs/introduction/best-practices.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

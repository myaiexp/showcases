// aframe example: tick and tock: per-frame handlers before and after rendering
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'tick and tock: per-frame handlers before and after rendering',
  summary:
    'A clock component spins its box in tick and counts frames in tock. The board shows the call order (tick then tock), tick\'s time and timeDelta in milliseconds and what the camera argument of tock holds: the docs list one, but 1.8.0 hands it to systems only.',
  section: 'Core API',
  tags: ['tick', 'tock', 'time', 'timeDelta', 'camera'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

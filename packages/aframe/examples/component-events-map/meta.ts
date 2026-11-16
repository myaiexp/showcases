// aframe example: events: handlers attached on play and detached on pause and remove
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'events: handlers attached on play and detached on pause and remove',
  summary:
    'A component\'s events object handles click without any addEventListener bookkeeping. Pausing the entity detaches it so clicks do nothing, playing re-attaches it, and removing the component detaches it for good.',
  section: 'Core API',
  tags: ['events', 'click', 'pause', 'play', 'remove'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

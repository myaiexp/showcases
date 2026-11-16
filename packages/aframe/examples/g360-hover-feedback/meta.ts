// aframe example: 360 gallery guide: scale feedback with event-set instances
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '360 gallery guide: scale feedback with event-set instances',
  summary:
    'Each link carries several event-set__id instances, which set scale on mouseenter, mouseleave and mousedown or mouseup, as the guide describes. The event-set component is our own, from the guide\'s prose.',
  section: 'Guides',
  tags: ['event-set', 'mouseenter', 'mouseleave', 'mousedown', 'scale', 'multiple', 'cursor'],
  docs: ['repo/docs/guides/building-a-360-image-gallery.md', 'repo/docs/components/cursor.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

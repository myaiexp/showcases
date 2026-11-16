// aframe example: 360 gallery guide: the finished gallery
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '360 gallery guide: the finished gallery',
  summary:
    'Three thumbnail links built from template, layout, event-set and proxy-event. Clicking one fades the sky to black, swaps its image 300 ms later with an event-set _delay and fades back. All panoramas are painted in code.',
  section: 'Guides',
  tags: ['template', 'layout', 'event-set', 'proxy-event', 'animation', 'a-sky', 'material.src', 'cursor'],
  docs: ['repo/docs/guides/building-a-360-image-gallery.md', 'repo/docs/components/animation.md', 'repo/docs/components/cursor.md', 'repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

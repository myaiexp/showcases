// aframe example: 360 gallery guide: proxy-event and a chained fade animation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '360 gallery guide: proxy-event and a chained fade animation',
  summary:
    'A proxy-event component (written from the guide\'s description) re-emits a link\'s click on the sky as fade, which starts animation__fade to black; animationcomplete__fade then starts animation__fadeback. Click the link.',
  section: 'Guides',
  tags: ['proxy-event', 'animation', 'startEvents', 'animationcomplete', 'components.material.material.color', 'cursor'],
  docs: ['repo/docs/guides/building-a-360-image-gallery.md', 'repo/docs/components/animation.md', 'repo/docs/components/cursor.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

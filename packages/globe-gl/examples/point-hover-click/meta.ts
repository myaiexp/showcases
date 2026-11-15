// globe-gl example: Points: hover and click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Points: hover and click',
  summary:
    'onPointHover receives the point under the pointer (or null) and repaints it taller and red by setting the accessors again; onPointClick gets the point, the event and the clicked lat, lng and altitude, and flies the camera there with pointOfView.',
  section: 'Points Layer',
  tags: ['onPointHover', 'onPointClick', 'pointsTransitionDuration', 'pointOfView'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

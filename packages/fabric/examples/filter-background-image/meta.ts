// fabric example: Image filters: Filters on backgroundImage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Filters on backgroundImage',
  summary:
    'canvas.backgroundImage is a FabricImage with its own filters array: hue-rotate or blur only the background while objects on top keep their colours.',
  section: 'Image filters',
  tags: ['Canvas', 'backgroundImage', 'FabricImage', 'filters', 'HueRotation', 'Blur'],
  docs: [
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/namespaces/filters/classes/HueRotation.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Blur.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

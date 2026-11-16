// fabric example: Image filters: RemoveColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: RemoveColor',
  summary:
    'filters.RemoveColor makes every pixel near a chosen colour transparent; pick the colour and widen the distance until the backdrop vanishes.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'RemoveColor', 'color', 'distance'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/RemoveColor.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

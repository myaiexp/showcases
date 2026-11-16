// fabric example: Image filters: BlendImage multiply
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: BlendImage multiply',
  summary:
    'filters.BlendImage multiplies the picture with a second painted FabricImage; move and scale that image to slide the colour bands across.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'BlendImage', 'mode'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/BlendImage.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

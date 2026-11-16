// fabric example: Image filters: BlendImage mask
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: BlendImage mask',
  summary:
    'filters.BlendImage in mask mode takes the alpha channel of a second image, so only a soft spot of the landscape stays visible.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'BlendImage', 'mode'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/BlendImage.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

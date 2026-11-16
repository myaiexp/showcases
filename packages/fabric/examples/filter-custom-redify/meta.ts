// fabric example: Image filters: Custom filter: Redify
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Custom filter: Redify',
  summary:
    'The guide\'s Redify as a v7 filters.BaseFilter subclass with a fragment shader and an applyTo2d fallback, registered in classRegistry under showcase-redify.',
  section: 'Image filters',
  tags: ['BaseFilter', 'getFragmentSource', 'applyTo2d', 'classRegistry', 'FabricImage'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/BaseFilter.md',
    'repo/src/content/docs/api/variables/classRegistry.md',
    'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md',
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

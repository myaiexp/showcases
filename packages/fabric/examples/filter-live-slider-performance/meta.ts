// fabric example: Image filters: Live slider performance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Live slider performance',
  summary:
    'applyFilters() on every slider input event, then requestRenderAll(): it is synchronous, and the readout times it for 1 to 5 chained filters at three picture sizes.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'applyFilters', 'requestRenderAll'],
  docs: [
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Brightness.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Contrast.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Saturation.md',
    'repo/src/content/docs/api/namespaces/filters/classes/HueRotation.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Blur.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

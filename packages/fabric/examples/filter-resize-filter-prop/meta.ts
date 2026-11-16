// fabric example: Image filters: resizeFilter on an image
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: resizeFilter on an image',
  summary:
    'FabricImage.resizeFilter resamples a large picture while it is drawn small, once its scale drops under minimumScaleTrigger; compared with the plain canvas downscale.',
  section: 'Image filters',
  tags: ['FabricImage', 'resizeFilter', 'minimumScaleTrigger', 'Resize'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Resize.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

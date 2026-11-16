// fabric example: Image filters: Filters through toObject and loadFromJSON
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Filters through toObject and loadFromJSON',
  summary:
    'Each change is serialised with canvas.toObject() and loaded into a second canvas by loadFromJSON: the filters array comes back as live filter instances.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'toObject', 'loadFromJSON', 'fromObject'],
  docs: [
    'repo/src/content/docs/api/classes/Canvas.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
    'repo/src/content/docs/api/namespaces/filters/classes/BaseFilter.md',
    'repo/src/content/docs/api/namespaces/filters/variables/Sepia.md',
    'repo/src/content/docs/api/namespaces/filters/classes/HueRotation.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Pixelate.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

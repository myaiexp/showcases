// fabric example: Image filters: Resize types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Resize types',
  summary:
    'filters.Resize shrinks the pixels of a city picture with each resizeType (bilinear, hermite, sliceHack, lanczos) in its own canvas; a scale slider drives all four.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Resize', 'TResizeType', 'resizeType', 'scaleX', 'Canvas2dFilterBackend'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Resize.md',
    'repo/src/content/docs/api/namespaces/filters/type-aliases/TResizeType.md',
    'repo/src/content/docs/api/classes/Canvas2dFilterBackend.md',
    'repo/src/content/docs/api/functions/getFilterBackend.md',
    'repo/src/content/docs/api/functions/setFilterBackend.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

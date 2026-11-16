// fabric example: Image filters: Canvas2D vs WebGL backends
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Canvas2D vs WebGL backends',
  summary:
    'The same chain applied by a Canvas2dFilterBackend and a WebGLFilterBackend: setFilterBackend swaps the page-wide backend only for the synchronous applyFilters() call.',
  section: 'Image filters',
  tags: ['Canvas2dFilterBackend', 'WebGLFilterBackend', 'getFilterBackend', 'setFilterBackend', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/classes/Canvas2dFilterBackend.md',
    'repo/src/content/docs/api/classes/WebGLFilterBackend.md',
    'repo/src/content/docs/api/functions/getFilterBackend.md',
    'repo/src/content/docs/api/functions/setFilterBackend.md',
    'repo/src/content/docs/api/functions/initFilterBackend.md',
    'repo/src/content/docs/docs/Old docs/fabric-filters.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

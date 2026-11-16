// fabric example: Paths: drawing a path with strokeDashOffset
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paths: drawing a path with strokeDashOffset',
  summary:
    'A strokeDashArray of [length, length] and an animated strokeDashOffset make a Path draw itself, with the length read from getPathSegmentsInfo.',
  section: 'Paths',
  tags: ['Path', 'strokeDashArray', 'strokeDashOffset', 'getPathSegmentsInfo'],
  docs: ['repo/src/content/docs/api/classes/Path.md', 'repo/src/content/docs/api/classes/FabricObject.md', 'repo/src/content/docs/api/namespaces/util/functions/getPathSegmentsInfo.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

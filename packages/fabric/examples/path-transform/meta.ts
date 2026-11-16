// fabric example: Paths: transformPath
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Paths: transformPath',
  summary:
    'util.transformPath(path, matrix, pathOffset) applies a matrix to every command of a simplified path and returns new commands, without touching an object transform.',
  section: 'Paths',
  tags: ['transformPath', 'composeMatrix', 'pathOffset', 'util'],
  docs: ['repo/src/content/docs/api/classes/Path.md', 'repo/src/content/docs/api/namespaces/util/functions/transformPath.md', 'repo/src/content/docs/api/namespaces/util/functions/composeMatrix.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

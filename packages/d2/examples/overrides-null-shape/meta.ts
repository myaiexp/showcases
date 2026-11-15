// d2 example: Overrides: null deletes a shape
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Overrides: null deletes a shape',
  summary:
    'Setting a key to `null` deletes it. Deleting a shape also deletes its connections (every connection needs two ends) and its descendants. The tabs delete a lone shape, a connected shape and a nested one.',
  section: 'Overrides',
  tags: ['overrides', 'null', 'delete'],
  docs: ['repo/docs/tour/overrides.md', 'repo/static/d2/null-basic.d2', 'repo/static/d2/null-implicit-connection.d2', 'repo/static/d2/null-implicit-descendant.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});

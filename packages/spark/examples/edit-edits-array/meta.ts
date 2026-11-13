// Spark example: SplatMesh.edits assigned an explicit array of SplatEdit objects
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit edits array',
  summary:
    'One garden whose SplatMesh.edits property is swapped between four values: null (a scene-graph SplatEdit child applies), an empty array, a night set of two edits, and a pond-plus-cut set. The array edits are never added to the scene and get their shapes through the sdfs option. A select chooses the set, or it cycles by itself.',
  section: 'Splat Editing',
  tags: ['SplatMesh', 'edits', 'SplatEdit', 'sdfs', 'SplatEditSdf', 'ADD_RGBA', 'SET_RGB'],
  docs: ['repo/docs/docs/splat-editing.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

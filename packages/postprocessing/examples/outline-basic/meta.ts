// postprocessing example: OutlineEffect with a Selection, edgeStrength and visibleEdgeColor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: selection and colour',
  summary:
    'OutlineEffect draws an outline around the meshes in its Selection. selection.set() picks them, edgeStrength makes the line brighter and thicker, and visibleEdgeColor tints it. Cards walk the selection from object to object.',
  section: 'Outline',
  tags: ['OutlineEffect', 'Selection', 'selection.set', 'edgeStrength', 'visibleEdgeColor'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/core/Selection.js', 'repo/src/effects/glsl/outline.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});

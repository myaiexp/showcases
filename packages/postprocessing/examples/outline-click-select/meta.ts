// postprocessing example: click to select objects for an OutlineEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Outline: click to select',
  summary:
    'A three.js Raycaster finds the clicked mesh and Selection.toggle() adds it to or removes it from the OutlineEffect, which outlines whatever is selected. Drag still orbits the camera. Cards toggle one object a second instead of clicking.',
  section: 'Outline',
  tags: ['OutlineEffect', 'Selection', 'selection.toggle', 'selection.clear', 'blur'],
  docs: ['repo/README.md', 'repo/src/effects/OutlineEffect.js', 'repo/src/core/Selection.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

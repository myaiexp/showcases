// Spark example: global SplatEdit vs child SplatEdit vs editable false
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Edit global vs child',
  summary:
    'Three torus knots. A yellow sphere SplatEdit added to the scene root is global and paints every editable knot it crosses; the middle knot also owns a cyan edit added as its child; the right knot has editable set to false and ignores both. Checkboxes switch each edit and each knot’s editable flag.',
  section: 'Splat Editing',
  tags: ['SplatEdit', 'SplatEditSdf', 'editable', 'global edit', 'SplatMesh', 'SET_RGB'],
  docs: ['repo/docs/docs/splat-editing.md', 'repo/docs/docs/splat-mesh.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

// playcanvas example: Compound collision shapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Compound collision shapes',
  summary:
    'Three dynamic bodies whose outline is a compound of child collision shapes: a T built from two boxes, a chair from a seat, a back and four legs, and a dumbbell from two spheres and a bar. The parent owns the rigidbody and the children carry primitive shapes only. A slider moves the dumbbell\'s child shapes at runtime, which updates the compound and wakes the body.',
  section: 'Physics',
  tags: ['collision', 'compound', 'halfExtents', 'rigidbody', 'setLocalPosition'],
  docs: ['repo/docs/user-manual/physics/collision-shapes.md', 'repo/docs/user-manual/editor/scenes/components/collision.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

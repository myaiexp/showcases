// galacean example: Static collider: addShape, removeShape, clearShapes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Static collider: addShape, removeShape, clearShapes",
  summary:
    "A StaticCollider is built up with three addShape calls, loses the middle shape with removeShape and is emptied with clearShapes, while balls keep dropping: they land on exactly the shapes that exist.",
  section: "Physics",
  tags: ['Collider.addShape', 'Collider.removeShape', 'Collider.clearShapes', 'Collider.shapes'],
  docs: [
    'repo/docs/en/physics/collider/staticCollider.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

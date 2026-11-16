// aframe example: visible: hide a group, object3D.visible versus setAttribute
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "visible: hide a group, object3D.visible versus setAttribute",
  summary: "visible: false removes an entity from rendering but keeps it in the scene, and hides every child too, so a container entity flips a whole group. A toggle sets visible on the container with setAttribute, another sets object3D.visible directly, and getAttribute('visible') reflects both.",
  section: 'Components',
  tags: ["visible", "setAttribute", "object3D.visible", "getAttribute", "children"],
  docs: ["repo/docs/components/visible.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

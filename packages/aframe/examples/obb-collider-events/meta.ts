// aframe example: obb-collider: collision events between oriented boxes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "obb-collider: collision events between oriented boxes",
  summary: "Entities with obb-collider are checked for overlap using oriented bounding boxes, and a pair emits obbcollisionstarted with detail.withEl when they touch and obbcollisionended when they part. showColliders on the scene draws the boxes. A spinning bar slides back and forth through a fixed block, which flashes while they overlap.",
  section: 'Components',
  tags: ["obb-collider", "showColliders", "obbcollisionstarted", "obbcollisionended", "withEl", "size", "trackedObject3D"],
  docs: ["repo/docs/components/obb-collider.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

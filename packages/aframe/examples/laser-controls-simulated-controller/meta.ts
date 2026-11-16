// aframe example: laser-controls: the laser and cursor, with the controller events emitted by hand
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "laser-controls: the laser and cursor, with the controller events emitted by hand",
  summary: "laser-controls wraps the controller components and, once a controller connects, shows the raycaster laser and configures a cursor with the trigger as its down and up events. With no headset, buttons emit controllerconnected (from tracked-controls) and triggerdown/triggerup (from vive-controls) on the entity, so the laser appears and a trigger press clicks the box it points at; model: false avoids the controller model download.",
  section: 'Components',
  tags: ["laser-controls", "controllerconnected", "triggerdown", "triggerup", "raycaster", "cursor", "hand", "model", "showLine", "vive-controls"],
  docs: ["repo/docs/components/laser-controls.md", "repo/docs/components/tracked-controls.md", "repo/docs/components/vive-controls.md", "repo/docs/components/raycaster.md", "repo/docs/components/cursor.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

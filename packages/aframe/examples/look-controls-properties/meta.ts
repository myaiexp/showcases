// aframe example: look-controls: enabled, reverseMouseDrag and mouseEnabled
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "look-controls: enabled, reverseMouseDrag and mouseEnabled",
  summary: "look-controls turns the camera as you drag. Toggles switch the component on and off, reverse the drag direction and disable the mouse, and the read-out follows the camera's yaw and pitch (in degrees) from its rotation. In the card, the camera turns on its own.",
  section: 'Components',
  tags: ["look-controls", "enabled", "reverseMouseDrag", "mouseEnabled", "touchEnabled", "pointerLockEnabled", "camera"],
  docs: ["repo/docs/components/look-controls.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

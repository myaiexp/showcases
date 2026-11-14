// playcanvas example: Input source properties
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Input source properties',
  summary:
    "An XrInputSource describes itself: handedness, targetRayMode (pointer, gaze or screen), profiles such as oculus-touch-v2, whether it has a grip pose, and a gamepad with buttons and axes. Two simulated Touch controllers show those fields in a live readout while their trigger, squeeze and thumbstick are driven from gamepad.buttons and gamepad.axes. A real session swaps the simulation for the sources the platform reports.",
  section: 'XR',
  tags: ['XrInputSource', 'handedness', 'targetRayMode', 'XRTARGETRAY_POINTER', 'profiles', 'grip', 'gamepad'],
  docs: ['repo/docs/user-manual/xr/input-sources.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

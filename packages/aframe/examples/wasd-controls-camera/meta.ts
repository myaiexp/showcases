// aframe example: wasd-controls: move the camera with the keyboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "wasd-controls: move the camera with the keyboard",
  summary: "The docs' camera with wasd-controls: W and S go along Z, A and D along X, and acceleration sets how fast speed builds. Click the view so it has focus, then use WASD or the arrow keys; sliders change acceleration, and fly lets the camera climb when you look up. The card presses W and D by itself.",
  section: 'Components',
  tags: ["wasd-controls", "acceleration", "fly", "enabled", "camera", "keyboard", "WASD"],
  docs: ["repo/docs/components/wasd-controls.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

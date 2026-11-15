// aframe example: wasd-controls: wsAxis, adAxis and inverted keys on a box
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "wasd-controls: wsAxis, adAxis and inverted keys on a box",
  summary: "wasd-controls works on any entity, and its axes can be rewired: here a box moves along Y with W and S and along Z with A and D, with the A and D direction inverted. Selects pick the axes and toggles invert them. Click the view for keyboard focus; the card presses the keys itself.",
  section: 'Components',
  tags: ["wasd-controls", "wsAxis", "adAxis", "wsInverted", "adInverted", "acceleration", "keyboard"],
  docs: ["repo/docs/components/wasd-controls.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// babylon-js example: GamepadManager state readout
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'GamepadManager state readout',
  summary:
    'A GamepadManager with connect and disconnect observables moves a ball from the left stick and jumps it on button A, reading stick, button and trigger state straight from the Gamepad. With no pad attached, a scripted virtual Xbox360Pad built on a fake browser gamepad fills in.',
  section: 'Input',
  tags: ['GamepadManager', 'Xbox360Pad', 'onGamepadConnectedObservable', 'onButtonDownObservable', 'leftStick', 'leftTrigger'],
  docs: ['repo/content/features/featuresDeepDive/input/gamepads.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

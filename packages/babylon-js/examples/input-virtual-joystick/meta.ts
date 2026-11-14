// babylon-js example: VirtualJoystick overlay canvas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'VirtualJoystick overlay canvas',
  summary:
    'Two VirtualJoysticks (left and right side) move a ball and orbit the camera through deltaPosition. They draw on one page-wide overlay canvas, so the full view only engages it on request and releases it with Esc or a button, then releaseCanvas on unmount. Cards show a scripted stand-in.',
  section: 'Input',
  tags: ['VirtualJoystick', 'deltaPosition', 'alwaysVisible', 'releaseCanvas', 'setPosition'],
  docs: ['repo/content/features/featuresDeepDive/input/virtualJoysticks.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

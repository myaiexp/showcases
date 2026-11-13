// Spark example: PointerControls options, inertia and the doublePress callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PointerControls drag, slide and inertia',
  summary:
    'PointerControls used alone on the canvas: drag rotates the view, right-drag or two fingers slide, the wheel moves forward. Sliders set rotateSpeed, slideSpeed and the two inertia factors, the checkboxes flip the reverse options, and the doublePress callback resets the camera and reports where and how fast you pressed.',
  section: 'Controls',
  tags: ['PointerControls', 'rotateInertia', 'moveInertia', 'reverseRotate', 'doublePress'],
  docs: ['repo/docs/docs/controls.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

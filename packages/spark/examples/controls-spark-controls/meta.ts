// Spark example: SparkControls (FpsMovement + PointerControls) flying through a garden
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SparkControls fly-through',
  summary:
    'The controls Spark ships: one SparkControls on the canvas, updated with the camera every frame. Keys and a gamepad move and turn you (FpsMovement), dragging looks around and right-drag or two fingers slide (PointerControls), and Shift, Ctrl and Caps Lock scale the speed. The card walks the camera on its own.',
  section: 'Controls',
  tags: ['SparkControls', 'FpsMovement', 'PointerControls', 'update'],
  docs: ['repo/docs/docs/controls.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

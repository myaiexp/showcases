// galacean example: Input: pointers and their phases
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: pointers and their phases",
  summary:
    "The InputManager's live list of Pointer objects: id, phase (Down, Move, Stationary, Up, Leave), button, position and deltaPosition, plus isPointerDown, isPointerHeldDown and isPointerUp. Touch with several fingers to see more than one.",
  section: "Input",
  tags: ['inputManager', 'pointers', 'Pointer', 'PointerPhase', 'isPointerDown', 'isPointerHeldDown', 'isPointerUp', 'multiPointerEnabled'],
  docs: [
    'repo/docs/en/input/pointer.mdx',
    'repo/docs/en/input/input.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

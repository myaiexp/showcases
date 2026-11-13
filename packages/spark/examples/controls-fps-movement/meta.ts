// Spark example: FpsMovement with custom keycodeMoveMapping and adjustable speeds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FpsMovement key mapping and speeds',
  summary:
    'FpsMovement used without PointerControls. Its keycodeMoveMapping is swapped live between a WASD and an IJKL layout, each with up and down keys, and moveSpeed, rotateSpeed and shiftMultiplier are plain properties the sliders write. update(deltaTime, camera) applies it all each frame while you fly through a lattice of splats.',
  section: 'Controls',
  tags: ['FpsMovement', 'keycodeMoveMapping', 'moveSpeed', 'shiftMultiplier', 'constructGrid'],
  docs: ['repo/docs/docs/controls.md', 'repo/docs/docs/procedural-splats.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

// babylon-js example: PhysicsHelper updraft and vortex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'PhysicsHelper updraft and vortex',
  summary:
    'Two PhysicsHelper events running continuously: an updraft in Center mode that lifts balls up a column, and a vortex with its centripetal, centrifugal and updraft forces that spins them around another. Both are enabled, then disabled and disposed on unmount.',
  section: 'Physics',
  tags: ['PhysicsHelper', 'updraft', 'vortex', 'PhysicsUpdraftMode', 'enable', 'disable'],
  docs: ['repo/content/features/featuresDeepDive/physics/v2/forces.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

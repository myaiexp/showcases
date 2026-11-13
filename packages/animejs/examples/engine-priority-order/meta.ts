// animejs example: priority execution order in the engine
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Engine priority execution order',
  summary:
    'Three identical animations are added in order A, B, C. The priority parameter changes the order the engine runs them in each tick, read back from their onUpdate callbacks.',
  section: 'Engine',
  tags: ['engine', 'priority', 'animate', 'onUpdate', 'execution order'],
  docs: ['pages/animejs-com/documentation/engine.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

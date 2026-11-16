// aframe example: Entity states: addState, removeState, is and the state events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Entity states: addState, removeState, is and the state events',
  summary:
    'addState(\'selected\') pushes a state onto an entity, emits stateadded and makes is(\'selected\') true; removeState pops it and emits stateremoved. The listeners recolour the box and the board logs each call.',
  section: 'Core API',
  tags: ['addState', 'removeState', 'is', 'states', 'stateadded', 'stateremoved'],
  docs: ['repo/docs/core/entity.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

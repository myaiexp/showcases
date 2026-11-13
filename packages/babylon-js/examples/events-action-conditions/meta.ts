// babylon-js example: ActionManager conditions and chains
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ActionManager conditions and chains',
  summary:
    'A locked door whose pick action carries a StateCondition: it only swings once a key has set door.state, and a then() chain closes it on the next pick. A lamp button adds a PredicateCondition on the door angle and a ValueCondition on the same state. Cards replay a scripted sequence of picks.',
  section: 'Events',
  tags: ['StateCondition', 'PredicateCondition', 'ValueCondition', 'SetValueAction', 'InterpolateValueAction', 'Action.then', 'ExecuteCodeAction'],
  docs: ['repo/content/features/featuresDeepDive/events/actions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

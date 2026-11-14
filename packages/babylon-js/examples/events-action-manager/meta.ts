// babylon-js example: ActionManager triggers and actions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ActionManager triggers and actions',
  summary:
    'Actions bound to triggers: OnEveryFrameTrigger with IncrementValueAction spins a cube, pointer over/out drive InterpolateValueAction on scaling and colour, OnPickTrigger runs a CombineAction then a chained one, intersection triggers light a pad, and key triggers recolor. Cards raise the pointer triggers with processTrigger.',
  section: 'Events',
  tags: ['ActionManager', 'IncrementValueAction', 'InterpolateValueAction', 'SetValueAction', 'CombineAction', 'OnIntersectionEnterTrigger', 'OnKeyUpTrigger', 'processTrigger'],
  docs: ['repo/content/features/featuresDeepDive/events/actions.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

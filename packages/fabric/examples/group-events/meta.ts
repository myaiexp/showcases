// fabric example: Groups: events on a group and its members
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Groups: events on a group and its members',
  summary:
    'A group fires mousedown with the member in subTargets, selected, moving and modified like any object, and object:added and object:removed when members come and go; each member fires added and removed.',
  section: 'Groups',
  tags: ['Group', 'mousedown', 'subTargets', 'selected', 'moving', 'modified', 'object:added', 'object:removed', 'added', 'removed'],
  docs: [
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/interfaces/GroupEvents.md',
    'repo/src/content/docs/api/interfaces/ObjectEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

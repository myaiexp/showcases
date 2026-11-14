// g6 example: Hover activate: state and inactiveState
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Hover activate: state and inactiveState',
  summary: 'state names the state given to the hovered element and its neighbours, inactiveState the one given to everything else, which dims the rest of the graph.',
  section: 'Behavior',
  tags: ['hover-activate', 'state', 'inactiveState'],
  docs: ['repo/packages/site/docs/manual/behavior/HoverActivate.en.md', 'repo/packages/site/common/api/behaviors/hover-element.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

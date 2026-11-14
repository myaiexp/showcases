// g6 example: Focus element: graph.focusElement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Focus element: graph.focusElement',
  summary: 'graph.focusElement(id) is what the behavior calls on a click; buttons call it for one node or for two at once, and the card steps through nodes with it.',
  section: 'Behavior',
  tags: ['focusElement', 'viewport', 'animation'],
  docs: ['repo/packages/site/docs/manual/behavior/FocusElement.en.md', 'repo/packages/site/docs/api/element.en.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

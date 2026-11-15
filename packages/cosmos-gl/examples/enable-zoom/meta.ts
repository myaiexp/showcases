// cosmos-gl example: Disable zooming
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Disable zooming',
  summary:
    'With enableZoom set to false the mouse wheel, double-click and pinch no longer zoom. Zoom calls from code, such as zoom() and fitView(), still work. The card shows a scripted wheel being obeyed and then ignored.',
  section: 'View & zoom',
  tags: ['enableZoom', 'zoom', 'fitView', 'setConfigPartial'],
  docs: ['repo/src/stories/configuration.mdx', 'repo/src/stories/api-reference.mdx'],
  provenance: 'pure',
  added: '2026-11-15',
});

// fabric example: Layout managers: layout:before and layout:after
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layout managers: layout:before and layout:after',
  summary:
    'A Group fires layout:before and layout:after around every layout. The context names the trigger (added, removed, object_modifying, object_modified, imperative) and the after event says whether the layout was skipped.',
  section: 'Layout managers',
  tags: ['layout:before', 'layout:after', 'LayoutManager', 'Group', 'triggerLayout', 'LayoutBeforeEvent', 'LayoutAfterEvent'],
  docs: [
    'repo/src/content/docs/api/classes/Group.md',
    'repo/src/content/docs/api/classes/LayoutManager.md',
    'repo/src/content/docs/api/interfaces/GroupEvents.md',
    'repo/src/content/docs/api/interfaces/StaticCanvasEvents.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

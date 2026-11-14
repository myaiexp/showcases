// deck-gl example: a custom widget that changes the view state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: getViewState and setViewState',
  summary:
    "A custom widget renders four buttons that read each attached view's state with getViewState and write a new bearing and pitch with setViewState, using the same path as a user gesture, with a FlyToInterpolator transition. Its step prop changes through setProps.",
  section: 'Custom widgets',
  tags: ['Widget', 'getViewState', 'setViewState', 'viewIds', 'FlyToInterpolator', 'onRenderHTML'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// deck-gl example: a custom widget with controlled and uncontrolled state
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: controlled and uncontrolled state',
  summary:
    'A SwitchWidget with initialOn (uncontrolled), on (controlled) and onChange props, following the convention of the built-in widgets. One instance keeps its own state; the other is driven by the app, which can refuse the change, so the button only flips when the app passes a new on prop.',
  section: 'Custom widgets',
  tags: ['Widget', 'controlled', 'uncontrolled', 'onChange', 'defaultProps', 'updateHTML'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/developer-guide/custom-widgets/README.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

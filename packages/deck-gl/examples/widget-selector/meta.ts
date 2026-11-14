// deck-gl example: SelectorWidget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'SelectorWidget',
  summary:
    'A SelectorWidget shows the selected option as an icon button and opens a menu of the others. Picking one changes how the city dots are sized, through a getRadius updateTrigger.',
  section: 'Widgets',
  tags: ['SelectorWidget', 'options', 'initialValue', 'onChange', 'updateTriggers'],
  docs: [
    'repo/docs/api-reference/widgets/selector-widget.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

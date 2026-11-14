// deck-gl example: the smallest custom widget
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom widget: the minimal Widget subclass',
  summary:
    'A Widget subclass with static defaultProps, a className and placement, a setProps that mirrors placement and viewId into members, and an onRenderHTML that writes its text. A select calls setProps on the instance, and another changes the placement through the Deck widgets prop.',
  section: 'Custom widgets',
  tags: ['Widget', 'onRenderHTML', 'setProps', 'placement', 'defaultProps', 'className'],
  docs: [
    'repo/docs/developer-guide/custom-widgets/README.md',
    'repo/docs/developer-guide/custom-widgets/universal-widgets.md',
    'repo/docs/api-reference/core/widget.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

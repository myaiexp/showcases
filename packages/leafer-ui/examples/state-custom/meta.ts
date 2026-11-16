// leafer-ui example: State: switch custom states
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State: switch custom states",
  summary:
    "states defines named states (a style, or a style with an animation); state picks the active one and transition makes the change ease. Clicking the rect switches between \"color\" and \"rotate\".",
  section: "Fun",
  tags: ['Rect', 'states', 'state', 'transition', 'animation', '@leafer-in/state', '@leafer-in/animate'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/plugin/state.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

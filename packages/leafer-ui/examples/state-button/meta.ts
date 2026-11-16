// leafer-ui example: State: a button with hover and press styles
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "State: a button with hover and press styles",
  summary:
    "button: true makes a Box a button whose children follow its interaction states. hoverStyle and pressStyle restyle it (scale, fill, radius); transitionOut sets how it eases back. The card hovers and presses it by simulated input.",
  section: "Fun",
  tags: ['Box', 'button', 'hoverStyle', 'pressStyle', 'transitionOut', '@leafer-in/state', '@leafer-in/animate'],
  docs: ['pages/www-leaferjs-com/ui/en/guide/plugin/state.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

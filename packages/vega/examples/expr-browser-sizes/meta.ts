// vega example: Expressions: containerSize, windowSize and screen
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Expressions: containerSize, windowSize and screen",
  summary:
    "Three bars comparing the width of this view's container, the browser window and the screen, with a table of what the browser functions return; resize the window to see them follow.",
  section: 'Expressions',
  tags: ["expression.containerSize","expression.windowSize","expression.screen","signal.on.container:resize"],
  docs: ["repo/docs/docs/expressions.md","repo/docs/docs/event-streams.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

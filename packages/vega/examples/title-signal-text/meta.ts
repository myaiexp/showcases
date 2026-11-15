// vega example: Title Text from Signals
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Title Text from Signals",
  summary:
    "The title and subtitle are signal expressions: they show the hovered bar's month and value and a running total; a ghost pointer hovers the bars in cards.",
  section: "Title",
  tags: ["title.text","title.subtitle","signals.on","event.mouseover"],
  docs: ["repo/docs/docs/title.md","repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// vchart example: Events: legend click and hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: legend click and hover",
  summary:
    "legendItemClick, legendItemHover and legendItemUnHover on a pie legend. The hover handler reads the item name and calls updateState so the other slices fade through a custom legend_hover_reverse state, as Event.md shows.",
  section: "Events",
  tags: ['legendItemClick','legendItemHover','legendItemUnHover','updateState'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Event.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

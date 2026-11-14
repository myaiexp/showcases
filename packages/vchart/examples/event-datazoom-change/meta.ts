// vchart example: Events: dataZoomChange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: dataZoomChange",
  summary:
    "The dataZoomChange event fires while a dataZoom window slides, carrying start and end as fractions, the data values at both ends and the categories in view. In the card the window is moved from code; the full view can drag it.",
  section: "Events",
  tags: ['dataZoomChange','dataZoom','setStartAndEnd'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

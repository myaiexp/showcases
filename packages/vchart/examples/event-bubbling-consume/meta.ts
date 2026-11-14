// vchart example: Events: bubbling levels and consume
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: bubbling levels and consume",
  summary:
    "A click bubbles from mark to model to chart to vchart, and a listener for each level logs it. Setting consume: true on one level's query stops the event there, so the later levels stay silent.",
  section: "Events",
  tags: ['level','consume','bubbling','on','EventQuery'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

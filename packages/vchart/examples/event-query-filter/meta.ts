// vchart example: Events: query filters on click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: query filters on click",
  summary:
    "vchart.on('click') with no query, with level and type, with markName, and with a filter function, each reported in a log. Clicks are fired at the bars from code; vchart.off removes the handler between queries.",
  section: "Events",
  tags: ['on','off','EventQuery','level','type','markName','filter'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Event.md",
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// vchart example: Events: dimensionClick and dimensionHover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: dimensionClick and dimensionHover",
  summary:
    "The combined dimension events carry every datum on the dimension under the pointer. The log lists the day and the values of both teams for each click fired from code, and for any real hover or click in the full view.",
  section: "Events",
  tags: ['dimensionClick','dimensionHover','dimensionInfo','on'],
  docs: [
    "repo/docs/assets/api/en/API/event.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

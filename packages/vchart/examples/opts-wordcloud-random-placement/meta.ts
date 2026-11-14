// vchart example: Word cloud random placement
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Word cloud random placement",
  summary: "random decides whether each word spirals out clockwise or counterclockwise at random. Off, the layout is deterministic; on, every rebuild gives a different arrangement of the same words. A select sets it and a button re-rolls.",
  section: "Option: Series",
  tags: ["wordCloud.random","rebuild","layout"],
  docs: [
    'repo/docs/assets/option/en/series/word-cloud.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

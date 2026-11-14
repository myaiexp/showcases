// vchart example: Media query: onResize callback
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Media query: onResize callback",
  summary:
    "query.onResize returns whether the query matches (here: the chart is narrower than 1.6 times its height), and the action uses a spec callback and a series filterType. The full view logs each resize call and offers four sizes.",
  section: "Self-adaption",
  tags: ['media','onResize','filterType','spec callback','rose'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Self-adaption/Media_Query.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

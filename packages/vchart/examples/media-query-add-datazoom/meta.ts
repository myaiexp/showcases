// vchart example: Media query: append a component when narrow
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Media query: append a component when narrow",
  summary:
    "A media action with forceAppend adds a dataZoom to a bar chart that has none once the chart is narrower than the query's maxWidth, and removes it again on a wide chart.",
  section: "Self-adaption",
  tags: ['media','forceAppend','dataZoom','maxWidth'],
  docs: [
    "repo/docs/assets/guide/en/tutorial_docs/Self-adaption/Media_Query.md",
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

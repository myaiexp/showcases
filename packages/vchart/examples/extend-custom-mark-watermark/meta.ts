// vchart example: Custom mark: a data-driven text watermark
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Custom mark: a data-driven text watermark",
  summary:
    "A customMark of type text, bound to its own one-row dataset with dataId, draws a large year behind a ranking bar chart. The text callback reads the datum, and updateData on both datasets changes the bars and the year together.",
  section: 'Custom Extension',
  tags: ['customMark', 'type text', 'dataId', 'style.text', 'updateData'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/extend/custom_mark.md',
    'repo/docs/assets/guide/en/tutorial_docs/Animation/Animation_Cases.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

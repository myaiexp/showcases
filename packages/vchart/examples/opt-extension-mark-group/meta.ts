// vchart example: extensionMark group: a badge made of child marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "extensionMark group: a badge made of child marks",
  summary:
    "An extensionMark of type group holds a rect and a text as children. Each child names the series data with dataId, so the group draws one badge per bar from the series' value-to-pixel helpers, and the badges follow the bars when data updates.",
  section: "Option: Common",
  tags: ["extensionMark","group","children","rect","text","valueToY"],
  docs: [
    'repo/docs/assets/option/en/common/extension-mark.md',
    'repo/docs/assets/option/en/common/custom-mark-base.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

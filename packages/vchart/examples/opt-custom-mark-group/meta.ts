// vchart example: customMark group: children drawn relative to a group
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "customMark group: children drawn relative to a group",
  summary:
    "A custom group mark holds five children, each bound to the rows with dataId: a card, a meter, a dot and two texts. The group sits on its own one-row dataset and its x and y shift every child together while the values update.",
  section: "Option: Common",
  tags: ["customMark","group","children","rect","symbol","text"],
  docs: [
    'repo/docs/assets/option/en/common/custom-mark.md',
    'repo/docs/assets/option/en/common/custom-mark-base.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// Tippy.js example: a full-name tip only when the name is cut off
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Full name only when it's cut off",
  summary:
    'A file list shortens long names with an ellipsis. Hovering a shortened name shows the whole thing, while short names that already fit get no tip at all, because the show hook can say no.',
  section: 'Props: lifecycle hooks',
  tags: ['onShow', 'return false', 'delay'],
  docs: ['repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

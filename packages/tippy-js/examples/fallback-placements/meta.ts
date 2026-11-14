// Tippy.js example: telling a tip where to go when its first choice has no room
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Plan B, plan C',
  summary:
    'Every item in these two side panels wants its tip on the right. The left panel has room for that. The right panel does not, so its tips try below the item, and the last item, which has no room below either, uses the left.',
  section: 'Props: position',
  tags: ['popperOptions', 'flip', 'fallbackPlacements', 'preventOverflow', 'placement'],
  docs: ['repo/website/src/pages/v6/all-props.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

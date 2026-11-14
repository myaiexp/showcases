// Tippy.js example: tips inside a scrolling box versus tips attached outside it
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Escaping a scrolling box',
  summary:
    'A small scrolling table sits inside a box that clips whatever pokes out. Tips attached inside the box are cut off at its edge; the same tips attached to the page outside the box pop out whole.',
  section: 'Props: position',
  tags: ['appendTo', 'parent', 'overflow'],
  docs: ['repo/website/src/pages/v6/all-props.mdx', 'repo/website/src/pages/v6/faq.mdx'],
  provenance: 'pure',
  added: '2026-11-14',
});

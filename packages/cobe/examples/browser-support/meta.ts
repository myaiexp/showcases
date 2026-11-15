// cobe example: @supports fallbacks for browsers without anchor positioning
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Browser support fallback',
  summary:
    "Anchored city labels, then the docs' two fallbacks for browsers without CSS Anchor Positioning: hide the labels, or drop the positioning and show them as a plain list in the corner. The badge says whether this browser supports anchors; the fallbacks are switched on by class so they can be seen anywhere.",
  section: 'Custom Labels',
  tags: ['@supports', 'anchor-name', 'position-anchor', '--cobe-{id}', '--cobe-visible-{id}'],
  docs: ['repo/website/app/components/CustomLabels.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});

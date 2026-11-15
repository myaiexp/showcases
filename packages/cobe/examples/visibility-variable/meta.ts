// cobe example: the visibility variable driving opacity, blur and scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'One variable, many properties',
  summary:
    "Three markers whose labels leave in different ways when they turn to the far side: New York's fades, London's blurs with the README's calc() form, and Lagos's shrinks to nothing. All three read the same kind of variable, --cobe-visible-{id}, through a different CSS property.",
  section: 'Custom Labels',
  tags: ['--cobe-visible-{id}', 'opacity', 'filter', 'scale', 'transition', 'position-anchor'],
  docs: ['repo/README.md', 'repo/website/app/components/CustomLabels.tsx'],
  provenance: 'pure',
  added: '2026-11-15',
});

// Pretext example: flow text around a floated box with layoutNextLineRange
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Flow text around a float',
  summary:
    "The README's floated-image loop: layoutNextLineRange gives each row a width, lines beside the box are narrower, and the cursor carries on. Resize the box or switch its side and the paragraph reflows from cached widths.",
  section: 'Manual line layout',
  tags: ['layoutNextLineRange', 'materializeLineRange', 'float', 'cursor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

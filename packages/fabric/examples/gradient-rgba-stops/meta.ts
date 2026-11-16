// fabric example: Gradients: Fading with rgba stops
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradients: Fading with rgba stops',
  summary:
    'v7 colorStops are only { offset, color }; a fade to transparent is an rgba colour with alpha 0, shown as a veil over a red disc.',
  section: 'Gradients',
  tags: ['Gradient', 'colorStops', 'rgba', 'Color'],
  docs: ['repo/CHANGELOG.md', 'repo/src/content/docs/api/classes/Gradient.md', 'repo/src/content/docs/api/classes/Color.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

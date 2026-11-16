// fabric example: Gradients: gradientUnits: pixels vs percentage
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradients: gradientUnits: pixels vs percentage',
  summary:
    'Two rectangles with the same red to blue gradient, one in pixels and one in percentage; resizing shows pixel coords staying put while percentages stretch.',
  section: 'Gradients',
  tags: ['Gradient', 'gradientUnits', 'pixels', 'percentage', 'coords'],
  docs: ['repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md', 'repo/src/content/docs/api/classes/Gradient.md', 'repo/src/content/docs/api/classes/Rect.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

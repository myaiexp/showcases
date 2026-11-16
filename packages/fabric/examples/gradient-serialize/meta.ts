// fabric example: Gradients: Gradient to data and back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Gradients: Gradient to data and back',
  summary:
    'gradient.toObject() gives plain data (type, coords, colorStops, gradientUnits); new Gradient(data) rebuilds it, shown side by side with the JSON.',
  section: 'Gradients',
  tags: ['Gradient', 'toObject', 'gradientUnits'],
  docs: ['repo/src/content/docs/api/classes/Gradient.md', 'repo/src/content/docs/docs/Old docs/fabric-intro-part-2.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

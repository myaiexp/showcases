// fabric example: Image filters: Saturation vs Vibrance
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Saturation vs Vibrance',
  summary:
    'A portrait through filters.Saturation and filters.Vibrance with one shared slider: both add colour, Vibrance spares what is already vivid.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Saturation', 'Vibrance'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Saturation.md',
    'repo/src/content/docs/api/namespaces/filters/classes/Vibrance.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

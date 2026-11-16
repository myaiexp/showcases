// fabric example: Image filters: Noise grain
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Noise grain',
  summary:
    'filters.Noise adds random grain to a portrait; the noise option is the strength in colour steps and each applyFilters() call draws new grain.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'Noise', 'applyFilters'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/Noise.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

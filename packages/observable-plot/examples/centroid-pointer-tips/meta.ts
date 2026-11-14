// observable-plot example: Centroid: pointer tips on a map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Centroid: pointer tips on a map',
  summary:
    'The pointer transform wraps centroid so a tip names the state whose centroid is nearest the cursor; red dots mark the centroids.',
  section: 'Transform: Centroid',
  tags: ['tip', 'pointer', 'centroid', 'dot'],
  docs: ['repo/docs/transforms/centroid.md', 'repo/docs/data/us-counties-10m.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

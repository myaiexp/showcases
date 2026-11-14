// observable-plot example: Map: custom map functions
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Map: custom map functions',
  summary:
    'A map method can be a function that receives one series of values and returns an array of the same length. Z score, day over day change and running max are applied per stock.',
  section: 'Transform: Map',
  tags: ['lineY', 'mapY', 'map function', 'z', 'stroke'],
  docs: ['repo/docs/transforms/map.md', 'repo/docs/data/aapl.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

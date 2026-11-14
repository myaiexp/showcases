// observable-plot example: Geo: points sized by r
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Geo: points sized by r',
  summary:
    'Point features sized by the r channel on an equirectangular world map, with made-up quakes along plate edges. Plot sorts big points first; sort: null draws input order.',
  section: 'Mark: Geo',
  tags: ['geo', 'r', 'sort', 'sphere', 'equirectangular'],
  docs: ['repo/docs/marks/geo.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

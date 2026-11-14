// observable-plot example: Area: faceted small multiples
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: faceted small multiples',
  summary:
    'The fy channel gives each industry its own row of small multiples, labelled with the first row per facet and framed.',
  section: 'Mark: Area',
  tags: ['areaY', 'fy', 'selectFirst', 'frame'],
  docs: ['repo/docs/marks/area.md', 'repo/docs/data/bls-industry-unemployment.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

// observable-plot example: Density: weighted by sex
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Density: weighted by sex",
  summary: "The weight channel sets each point's contribution to the density. A skew slider shifts the weights from female to male penguins, with dot opacity following the same weights.",
  section: 'Mark: Density',
  tags: ['density', 'weight', 'clip', 'strokeOpacity', 'dot'],
  docs: ['repo/docs/marks/density.md', 'repo/docs/data/penguins.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});

// tanstack-charts example: Unexpected categories stay out
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Unexpected categories stay out',
  summary:
    'Ordinal color scales add unseen values to their domain by default, which gives a surprise category a surprise color. Giving the scale an unknown value maps any category outside the declared domain to a neutral grey, and the legend lists only the declared categories. The third data set adds a package that is not in the domain.',
  section: 'Legends and Color',
  tags: ['scaleOrdinal', 'unknown', 'color.scale', 'legend'],
  docs: ['repo/docs/guides/legends-and-color.md', 'repo/docs/reference/scales-guides-and-color.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

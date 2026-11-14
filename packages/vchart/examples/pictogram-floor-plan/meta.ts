// vchart example: Pictogram: a floor plan coloured by value
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pictogram: a floor plan coloured by value",
  summary:
    "An office floor plan written as an SVG string, one named rect per room. The temperature of each room is mapped through a colour scale on the pictogram mark, with a hover state, and refreshed every 1.8 seconds with updateData.",
  section: "Word Cloud and Pictogram",
  tags: ['pictogram','svg','nameField','valueField','defaultFillColor','pictogram.state.hover'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pictogram.md',
    'repo/docs/assets/option/en/series/pictogram.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

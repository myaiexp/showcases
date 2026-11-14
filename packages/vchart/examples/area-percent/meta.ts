// vchart example: Area: 100% stacked areas
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: 100% stacked areas',
  summary:
    'stack plus percent: true normalizes every x position to 100% so the bands show shares of the total. The axis labels are formatted as percentages.',
  section: 'Line and Area',
  tags: ['stack', 'percent', 'axes.label.formatMethod'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Area.md',
    'repo/docs/assets/option/en/series/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

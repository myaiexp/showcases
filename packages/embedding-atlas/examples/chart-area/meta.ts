// embedding-atlas example: the area mark alone, under a line, split by color
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Area marks",
  summary:
    "A document count per month drawn as an area, then as an area under a line with its own stroke, then split into one area per source by a color encoding. interpolate smooths the edge.",
  section: "Charts",
  tags: ['mark: area', 'mark: line', 'interpolate', 'encoding.color', 'style'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

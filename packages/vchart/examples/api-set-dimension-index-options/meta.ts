// vchart example: API: setDimensionIndex options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: setDimensionIndex options',
  summary:
    'setDimensionIndex triggers the dimension interaction from code; its options choose whether the tooltip, the crosshair or both appear, and filter picks which axis answers. Buttons pick the option mix and step through the categories, and the card runs the mixes in turn.',
  section: 'API',
  tags: ['setDimensionIndex', 'DimensionIndexOption', 'tooltip', 'crosshair', 'filter'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// fabric example: Image filters: Custom ColorMatrix
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image filters: Custom ColorMatrix',
  summary:
    'A filters.ColorMatrix built from 20 numbers: edit the 15 colour cells with sliders, load a preset such as swapping red and blue, and toggle colorsOnly.',
  section: 'Image filters',
  tags: ['FabricImage', 'filters', 'ColorMatrix', 'matrix', 'colorsOnly'],
  docs: [
    'repo/src/content/docs/api/namespaces/filters/classes/ColorMatrix.md',
    'repo/src/content/docs/api/classes/FabricImage.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

// deck-gl example: FillStyleExtension size units
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'FillStyleExtension size units',
  summary:
    "fillPatternSizeUnits sets what a tile measures: meters stick to the ground and zoom with the map, pixels keep a constant screen size, common uses deck.gl's common space.",
  section: 'Extensions',
  tags: ['FillStyleExtension', 'fillPatternSizeUnits', 'getFillPatternScale'],
  docs: [
    'repo/docs/api-reference/extensions/fill-style-extension.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

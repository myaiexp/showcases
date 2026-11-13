// echarts example: Custom glyphs in calendar cells
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom glyphs in calendar cells',
  summary:
    'A custom series with coordinateSystem calendar. api.coord turns a date into the centre of its cell, params.coordSys supplies the cell size, and renderItem draws a circle, diamond, ring or bar whose size follows the minutes. Pick the glyph or draw new data.',
  section: 'Option: series.custom',
  tags: ['custom', 'coordinateSystem', 'calendar', 'renderItem', 'params.coordSys', 'api.coord', 'cellSize', 'encode'],
  docs: [
    'repo/en/option/series/custom.md',
    'repo/en/option/component/calendar.md',
    'repo/en/option/partial/zr-graphic.md',
  ],
  provenance: 'pure',
  added: '2026-11-13',
});

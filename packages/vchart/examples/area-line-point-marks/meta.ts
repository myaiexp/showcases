// vchart example: Area: area, line and point marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Area: area, line and point marks',
  summary:
    'An area series is three marks: the area, its edge line and the points. Each takes its own visible and style; the selects switch them on and off, and seriesMark sets which one the legend symbol follows.',
  section: 'Line and Area',
  tags: ['area.visible', 'line.visible', 'point.visible', 'seriesMark'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Area.md',
    'repo/docs/assets/option/en/series/area.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// fabric example: Free drawing: line cap, join and dash
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Free drawing: line cap, join and dash',
  summary:
    'The brush carries the stroke options of the paths it makes: strokeLineCap for the ends, strokeLineJoin for the corners and strokeDashArray for the pattern. Draw a zigzag to see all three.',
  section: 'Free drawing',
  tags: ['PencilBrush', 'strokeLineCap', 'strokeLineJoin', 'strokeDashArray', 'strokeMiterLimit', 'decimate'],
  docs: [
    'repo/src/content/docs/api/classes/BaseBrush.md',
    'repo/src/content/docs/api/classes/PencilBrush.md',
    'repo/src/content/docs/api/classes/Canvas.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

// css-doodle example: @t restarts, @T keeps going
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: '@t restarts, @T keeps going',
  summary:
    'Both needles spin at 120 degrees a second. Every three seconds the doodles re-render: @t starts from zero again, so its needle jumps, while @T counts from midnight and carries on. The full view can pause and resume them.',
  section: 'Cell functions',
  tags: ['@t', '@T', 'update()', 'pause()', 'rotate'],
  docs: [
    'pages/css-doodle-com/reference/function-t.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

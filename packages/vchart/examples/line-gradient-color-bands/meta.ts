// vchart example: Line: gradient color bands
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Line: gradient color bands',
  summary:
    'Two stops at the same offset make a hard edge in a gradient, so one line can change color across a threshold. A slider moves the \'warning\' offset, and the line is red above it, amber in the middle and green below.',
  section: 'Line and Area',
  tags: ['line.style.stroke', 'gradient', 'stops.offset'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Line.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

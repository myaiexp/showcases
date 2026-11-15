// vega example: Interactive and Non-Interactive Marks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Interactive and Non-Interactive Marks",
  summary:
    "Two rows of bars share one hover set and one mouseover handler. The bottom row is non-interactive until you tick the box, so it neither highlights nor reaches the readout.",
  section: "Marks",
  tags: ['marks.interactive','marks.encode.hover','signal.on'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

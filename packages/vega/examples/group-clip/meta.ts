// vega example: Group: Clip, Corners and Foreground Stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: Clip, Corners and Foreground Stroke",
  summary:
    "A group whose position, size, rounded corners, clip and strokeForeground are signals, holding three rects that poke out of it. Clip cuts them at the edge; strokeForeground draws the border over them.",
  section: "Mark Types",
  tags: ['marks.group.clip','marks.group.cornerRadius','marks.group.strokeForeground'],
  docs: ['repo/docs/docs/marks/group.md', 'repo/docs/docs/marks/group.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

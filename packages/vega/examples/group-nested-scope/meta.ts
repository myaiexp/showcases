// vega example: Group: Its Own Data, Scales and Axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Group: Its Own Data, Scales and Axes",
  summary:
    "The outer chart only places a frame. Inside it a group defines its own data, scales and two axes, so a whole sub-plot lives in the group; one top-level signal sets the sub-plot value range.",
  section: "Mark Types",
  tags: ['marks.group.data','marks.group.scales','marks.group.axes','marks.group.marks'],
  docs: ['repo/docs/docs/marks/group.md', 'repo/docs/docs/marks/group.vg.json'],
  provenance: 'pure',
  added: '2026-11-15',
});

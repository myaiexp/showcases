// vega example: Clipping to a Path
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Clipping to a Path",
  summary:
    "Stripes fill a group, but the mark that draws them is clipped to an SVG path. The path is a signal, so the visible window changes shape while a faint unclipped copy shows what is cut away.",
  section: "Marks",
  tags: ['marks.clip','marks.clip.path','signal'],
  docs: ['repo/docs/docs/marks.md', 'repo/docs/docs/types.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

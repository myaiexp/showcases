// globe-gl example: Paths: hover and click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paths: hover and click",
  summary:
    "pathLabel gives each path a tooltip; onPathHover repaints the hovered path red and thick by setting the accessors again; onPathClick gets the path, event and clicked lat, lng and altitude, and flies the camera to it.",
  section: "Paths Layer",
  tags: ['onPathHover', 'onPathClick', 'pathLabel', 'pathColor', 'pathStroke', 'pathPoints'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

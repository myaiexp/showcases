// galacean example: Space: camera viewport
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Space: camera viewport",
  summary:
    "Cameras draw into a rectangle of the canvas set by their viewport (x, y, width, height as fractions). Two cameras on one scene share the canvas, each in its own region.",
  section: "Core",
  tags: ['Camera', 'viewport', 'Vector4'],
  docs: [
    'repo/docs/en/core/space.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

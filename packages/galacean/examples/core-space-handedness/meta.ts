// galacean example: Space: right-handed axes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Space: right-handed axes",
  summary:
    "The engine's coordinate system: +X right, +Y up, +Z toward the viewer, so the camera looks down -Z and positive rotations turn counterclockwise. The full view switches between front and top cameras.",
  section: "Core",
  tags: ['Transform', 'worldForward', 'rotate', 'Camera'],
  docs: [
    'repo/docs/en/core/space.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// galacean example: World to screen: a label that follows
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "World to screen: a label that follows",
  summary:
    "A DOM label pinned to a moving sphere: each frame worldToScreenPoint converts the sphere's world position to canvas pixels and the label is placed there.",
  section: "Camera",
  tags: ['Camera', 'worldToScreenPoint', 'worldToViewportPoint'],
  docs: [
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

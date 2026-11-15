// galacean example: Perspective versus orthographic
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Perspective versus orthographic",
  summary:
    "The same corridor of cubes seen by one Camera that flips isOrthographic every few seconds: perspective makes far cubes smaller, orthographic keeps them equal.",
  section: "Camera",
  tags: ['Camera', 'isOrthographic'],
  docs: [
    'repo/docs/en/graphics/camera/camera.mdx',
    'repo/docs/en/graphics/camera/component.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

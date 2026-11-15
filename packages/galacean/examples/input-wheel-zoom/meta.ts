// galacean example: Input: wheel zoom
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: wheel zoom",
  summary:
    "inputManager.wheelDelta, the change of the scroll wheel in this frame, drives a camera dolly. Scroll over the canvas in the full view; cards feed a scripted wheel.",
  section: "Input",
  tags: ['inputManager', 'wheelDelta', 'Camera'],
  docs: [
    'repo/docs/en/input/wheel.mdx',
    'repo/docs/en/input/input.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

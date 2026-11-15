// galacean example: Input: key state table
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: key state table",
  summary:
    "isKeyHeldDown, isKeyDown and isKeyUp on the Space key, shown against the docs' state dictionary so the row matching the current frame lights up. Click the canvas and press Space; cards replay a scripted sequence.",
  section: "Input",
  tags: ['inputManager', 'isKeyHeldDown', 'isKeyDown', 'isKeyUp', 'Keys'],
  docs: [
    'repo/docs/en/input/keyboard.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

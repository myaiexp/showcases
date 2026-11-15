// galacean example: Input: moving with the keyboard
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Input: moving with the keyboard",
  summary:
    "A cube driven by isKeyHeldDown (WASD or the arrow keys) and isKeyDown (Space to hop). Click the canvas first so it has keyboard focus; cards drive the same script with a virtual key set.",
  section: "Input",
  tags: ['inputManager', 'isKeyHeldDown', 'isKeyDown', 'Keys', 'Script', 'onUpdate'],
  docs: [
    'repo/docs/en/input/keyboard.mdx',
    'repo/docs/en/input/input.mdx',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// leafer-ui example: KeyEvent: down, hold and up
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "KeyEvent: down, hold and up",
  summary: "key.down repeats while a key is held, key.hold fires once per press, and key.up on release; each carries key and code. Keyboard events are heard on the Leafer itself. Click the pane, then type; the card presses keys through the interaction.",
  section: "Events",
  tags: ["KeyEvent.DOWN", "KeyEvent.HOLD", "KeyEvent.UP", "key", "code"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/ui/Key.md"],
  provenance: 'pure',
  added: '2026-11-16',
});

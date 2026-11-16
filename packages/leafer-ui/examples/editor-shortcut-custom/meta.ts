// leafer-ui example: Editor shortcut: customise by changing config on key events
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor shortcut: customise by changing config on key events",
  summary: "The docs customise shortcuts by listening to keyboard events and changing the editor config: here pressing L toggles lockRatio (the card presses it through the ghost) and the readout shows the change.",
  section: 'Graphic editor',
  tags: ["Editor", "KeyEvent", "lockRatio", "config", "shortcut"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/Editor/shortcut.md", "pages/www-leaferjs-com/ui/en/plugin/in/editor/config/control.md"],
  provenance: 'pure',
  added: '2026-11-16',
});

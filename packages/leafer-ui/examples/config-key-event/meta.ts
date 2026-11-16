// leafer-ui example: Config: keyEvent
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Config: keyEvent",
  summary:
    "keyEvent: true (the default) lets the engine listen for the keyboard on the document, so KeyEvent.DOWN and UP reach your listeners; false turns key handling off. The log lists each key the engine heard.",
  section: "App & engine config",
  tags: ['Leafer', 'keyEvent', 'KeyEvent', 'config'],
  docs: ['pages/www-leaferjs-com/ui/en/reference/config/app/base.md'],
  provenance: 'pure',
  added: '2026-11-16',
});

// leafer-ui example: Editor config: rotateKey picks the key that turns handles into rotation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: rotateKey picks the key that turns handles into rotation",
  summary: "rotateKey returns true while the key that switches the resize handles to rotating is held; here Alt replaces the default Ctrl, so an Alt-drag on a corner rotates.",
  section: 'Graphic editor',
  tags: ["Editor", "rotateKey", "altKey", "rotating"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});

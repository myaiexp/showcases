// leafer-ui example: Editor config: rotateGap snaps rotation to steps
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Editor config: rotateGap snaps rotation to steps",
  summary: "While rotating, the angle snaps gradually to multiples of rotateGap (45 degrees by default); the card Ctrl-drags a corner under three gaps.",
  section: 'Graphic editor',
  tags: ["Editor", "rotateGap", "rotating"],
  docs: ["pages/www-leaferjs-com/ui/en/plugin/in/editor/config/control.md"],
  provenance: 'pure',
  added: '2026-11-16',
});

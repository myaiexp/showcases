// leafer-ui example: Events: the ways to call off()
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: the ways to call off()",
  summary: "off(type, listener) removes one listener, off(type) every listener of a type, off() all of them; arrays and space-separated strings name several types. Each choice rebuilds the same three listeners, removes some, then hovers and clicks.",
  section: "Interaction",
  tags: ["off","on","PointerEvent","array","string"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/off.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

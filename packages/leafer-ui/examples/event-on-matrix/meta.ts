// leafer-ui example: Events: on() with a list of [type, listener, options]
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: on() with a list of [type, listener, options]",
  summary: "on() also takes a multi-dimensional array, one [type, listener, options?] entry per listener. Enter, leave and a once-only down are registered in one call.",
  section: "Interaction",
  tags: ["on","array","once","PointerEvent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/on.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/off.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/emit.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

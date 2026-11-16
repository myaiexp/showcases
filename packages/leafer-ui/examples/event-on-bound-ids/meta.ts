// leafer-ui example: Events: on_() with a this binding, off_() with its id
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Events: on_() with a this binding, off_() with its id",
  summary: "on_() is on() plus a bind object for `this` in the listener, and it returns an id that off_() takes back. The ids are removed and restored in turn while the log shows who heard what.",
  section: "Interaction",
  tags: ["on_","off_","IEventListenerId","PointerEvent"],
  docs: [
    "pages/www-leaferjs-com/ui/en/reference/UI/on.md",
    "pages/www-leaferjs-com/ui/en/reference/UI/off.md"
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

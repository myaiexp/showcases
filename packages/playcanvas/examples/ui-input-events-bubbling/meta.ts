// PlayCanvas: Element input events and bubbling
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Element input events and bubbling",
  summary:
    "Elements with input enabled fire mouseenter, mouseleave and click; an event fires on the element hit and then on each ancestor, so one listener on a menu hears the clicks of all its items. The card fires enter and leave itself; the full view uses the real pointer.",
  section: "User Interface",
  tags: ["ElementInput","useInput","mouseenter","mouseleave","click","event.element"],
  docs: ["repo/docs/user-manual/user-interface/input.md","repo/docs/user-manual/user-interface/fonts.md"],
  provenance: 'pure',
  added: '2026-11-14',
});

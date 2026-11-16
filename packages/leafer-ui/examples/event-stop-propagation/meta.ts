// leafer-ui example: Event: stop, stopNow and stopDefault
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Event: stop, stopNow and stopDefault",
  summary: "e.stop() ends propagation to parents after the current element's listeners, e.stopNow() also silences the rest of the listeners, and stopDefault() only prevents the native default. A select picks what the middle box does.",
  section: "Events",
  tags: ["Event.stop", "Event.stopNow", "Event.stopDefault", "isStop", "isStopDefault"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/event/basic/Event.md"],
  provenance: 'pure',
  added: '2026-11-16',
});

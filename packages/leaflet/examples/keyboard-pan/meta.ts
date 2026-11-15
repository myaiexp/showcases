// leaflet example: Keyboard navigation options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Keyboard navigation options",
  summary:
    "The focused map pans with the arrow keys by keyboardPanDelta pixels (three times that with Shift) and zooms with + and -. A slider sets keyboardPanDelta, a toggle rebinds KeyboardHandler.keys to WASD (and puts them back when the example closes), and focus, blur and keydown are logged.",
  section: "Map interaction",
  tags: ["keyboard", "keyboardPanDelta", "KeyboardHandler.keys", "focus", "blur", "keydown"],
  docs: ["repo/src/map/Map.js", "repo/src/map/handler/KeyboardHandler.js"],
  provenance: 'pure',
  added: '2026-11-15',
});

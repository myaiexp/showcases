// leaflet example: tapHold: long press as contextmenu
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "tapHold: long press as contextmenu",
  summary:
    "With tapHold on, holding a touch for about 600 ms without moving more than tapTolerance pixels fires contextmenu on the map, which opens a popup. Buttons send scripted touches (too short, long enough, long with drift) and a slider sets tapTolerance.",
  section: "Map interaction",
  tags: ["tapHold", "tapTolerance", "contextmenu", "Popup", "openOn"],
  docs: ["repo/src/map/Map.js", "repo/src/map/handler/TapHoldHandler.js", "repo/src/layer/Popup.js"],
  provenance: 'pure',
  added: '2026-11-15',
});

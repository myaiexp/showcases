// leaflet example: A Handler: the tilt handler
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A Handler: the tilt handler",
  summary:
    `The extending tutorial's TiltHandler: a Handler subclass whose addHooks listens for deviceorientation events on the window and pans the map by gamma and beta pixels, and whose removeHooks stops. Registered with map.addHandler and switched with enable and disable. A phone's sensor would drive it; cards and desktops have none, so this example sends the same deviceorientation events itself from two sliders, or from a script in the card.`,
  section: "Extending Leaflet",
  tags: ["Handler", "addHooks", "removeHooks", "enable", "disable", "enabled", "addHandler", "DomEvent.on", "DomEvent.off", "panBy"],
  docs: [
    'repo/docs/examples/extending-3-controls/index.md',
    'repo/src/core/Handler.js',
    'repo/src/dom/DomEvent.js',
    'repo/src/layer/DivOverlay.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

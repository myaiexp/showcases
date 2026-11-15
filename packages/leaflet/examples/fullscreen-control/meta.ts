// leaflet example: Fullscreen control
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fullscreen control",
  summary:
    "A FullscreenControl on the map: the button, the enterfullscreen and exitfullscreen events in a log, the pseudo option (fill the window with CSS) and the container option (take the log panel along). The card shows the button idle and cannot go fullscreen.",
  section: "Controls",
  tags: ["FullscreenControl", "enterfullscreen", "exitfullscreen", "pseudo", "container", "toggle", "isFullscreen"],
  docs: ['repo/src/control/FullscreenControl.js', 'repo/src/map/Map.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

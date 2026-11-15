// leaflet example: when-ready
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "whenReady and load",
  summary:
    "A map created without a view has not loaded. whenReady(fn) queues a callback until the first setView fires load; called after that, it runs immediately. The log shows the order. Buttons register callbacks, set the view and start over.",
  section: "Map events & conversion",
  tags: ["whenReady", "load", "setView", "LeafletMap"],
  docs: ["repo/src/map/Map.js"],
  provenance: 'pure',
  added: '2026-11-15',
});

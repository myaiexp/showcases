// leaflet example: version and feature detection
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "version and feature detection",
  summary:
    `The version export names the Leaflet build in use, here read from the module and shown beside a plugin-style check that picks 1.x or 2.x names. Leaflet 2 removed the Browser namespace, so the replacements the migration guide lists are evaluated live: matchMedia for a coarse pointer, devicePixelRatio for retina, and the touch and pointer flags that are now always true.`,
  section: "Utilities & DOM",
  tags: ["version", "matchMedia", "devicePixelRatio", "Marker.defaultOptions", "Popup"],
  docs: ["repo/MIGRATION.md", "repo/PLUGIN-GUIDE.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

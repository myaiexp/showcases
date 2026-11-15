// leaflet example: Platform replacements for removed utilities
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Platform replacements for removed utilities",
  summary:
    `Leaflet 2 dropped helpers the platform now covers. Each step runs the 2.0 replacement from the migration table live on a marker's own element or a scratch value: Object.assign for extend, URLSearchParams for getParamString, classList for addClass, replaceChildren for empty, style.opacity for setOpacity, getComputedStyle for getStyle, and Util.stamp, which stays. The marker on the map changes as the steps run.`,
  section: "Extending Leaflet",
  tags: ["Object.assign", "URLSearchParams", "classList", "replaceChildren", "getComputedStyle", "requestAnimationFrame", "Util.stamp", "DivIcon"],
  docs: [
    'repo/MIGRATION.md',
    'repo/src/core/Util.js',
    'repo/src/dom/DomUtil.js',
    'repo/src/layer/marker/DivIcon.js',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

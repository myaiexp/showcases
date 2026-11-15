// leaflet example: A purely decorative map: inert
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "A purely decorative map: inert",
  summary:
    `A map that is only decoration should be hidden from assistive technology and have no tab stops. The inert attribute does both in one go: it takes the whole map out of the accessibility tree, the tab order and pointer interaction. A toggle sets it on the map's container; the readout counts the focusable elements inside the map and how many of them can still receive focus, found by trying focus() on each.`,
  section: "Accessibility & mobile",
  tags: ["inert", "tabindex", "Marker.keyboard", "ZoomControl", "focus"],
  docs: ["repo/docs/examples/accessibility/index.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

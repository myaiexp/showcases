// deck-gl example: First-person view with a minimap
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "First-person view with a minimap",
  summary:
    "A car loops a road: a driver's FirstPersonView and a MapView minimap, with layerFilter hiding the car from the driver's camera.",
  section: "Views",
  tags: ["FirstPersonView", "MapView", "layerFilter", "viewState"],
  docs: ["repo/docs/developer-guide/views.md", "repo/docs/api-reference/core/first-person-view.md", "repo/docs/api-reference/core/view.md"],
  provenance: 'pure',
  added: '2026-11-14',
});

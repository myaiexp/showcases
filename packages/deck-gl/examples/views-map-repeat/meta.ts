// deck-gl example: MapView repeat
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MapView repeat",
  summary:
    "A MapView with repeat draws extra copies of the world past the antimeridian at low zoom; a checkbox turns it off.",
  section: "Views",
  tags: ["repeat", "MapView"],
  docs: ["repo/docs/api-reference/core/map-view.md"],
  provenance: 'pure',
  added: '2026-11-14',
});

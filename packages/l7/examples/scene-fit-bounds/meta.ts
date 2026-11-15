// l7 example: fitBounds
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "fitBounds",
  summary:
    "fitBounds zooms and centres the map on a [[minLng, minLat], [maxLng, maxLat]] box (drawn dashed). The options argument turns the animation on or off for one call.",
  section: 'Scene',
  tags: ["fitBounds", "animate"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

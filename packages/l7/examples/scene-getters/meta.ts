// l7 example: Reading the camera back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Reading the camera back",
  summary:
    "getZoom, getCenter, getPitch and getSize follow the camera as it moves; the full view adds getType, getMinZoom/getMaxZoom, getPointSizeRange and the loaded property.",
  section: 'Scene',
  tags: ["getZoom", "getCenter", "getPitch", "getSize", "getType", "getMinZoom", "getMaxZoom", "getPointSizeRange", "loaded"],
  docs: ["repo/site/docs/api/scene.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// l7 example: MVT parser options
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "MVT parser options",
  summary:
    "The mvt parser takes tileSize, zoomOffset, minZoom, maxZoom and extent; change them and watch which tile levels get requested. Tiles are encoded in code.",
  section: "Source",
  tags: ["mvt","parser","tileSize","zoomOffset","minZoom","maxZoom","extent","addProtocol"],
  docs: ["repo/site/docs/api/source/mvt.en.md","repo/site/docs/api/common/source/tile/method.en.md", "repo/site/docs/api/tile/common/options.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

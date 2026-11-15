// globe-gl example: Globe: globeTileEngineUrl
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: globeTileEngineUrl",
  summary:
    "globeTileEngineUrl takes a function of slippy-map x, y and zoom level that returns an image URL, and the globe covers itself in those tiles, asking for finer levels as the camera nears the surface. Each tile here is painted on demand and labelled with its coordinates.",
  section: "Globe Layer",
  tags: ["globeTileEngineUrl", "showAtmosphere", "pointOfView"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

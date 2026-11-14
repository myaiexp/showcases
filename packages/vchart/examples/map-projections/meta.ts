// vchart example: Map: projection types
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map: projection types",
  summary:
    "region.projection.type redraws the same world as mercator, equirectangular, equal earth, natural earth, orthographic and more. Pick one from the select; the card steps through them.",
  section: "Map",
  tags: ['region','projection','type','equirectangular','orthographic'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Map.md',
    'repo/docs/assets/option/en/common/region.md',
    'repo/docs/assets/option/en/chart/map.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

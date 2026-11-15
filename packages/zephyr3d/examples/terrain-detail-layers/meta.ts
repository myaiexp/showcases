// zephyr3d example: Terrain detail layers and a splat map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Terrain detail layers and a splat map",
  summary:
    "numDetailMaps with setDetailMap, setDetailNormalMap, setDetailMapUVScale and setDetailMapRoughness blend three layers; setSplatMap replaces the weights, painted here in code (grass on gentle ground, rock where steep or high, sand low).",
  section: "Environment",
  tags: ['numDetailMaps', 'setDetailMap', 'setDetailNormalMap', 'setDetailMapUVScale', 'setDetailMapRoughness', 'setSplatMap', 'MAX_DETAIL_MAP_COUNT'],
  docs: ['repo/apps/doc/web/en/terrain-runtime.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

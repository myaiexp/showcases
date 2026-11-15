// globe-gl example: Globe: globeTileEngineClearCache
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Globe: globeTileEngineClearCache",
  summary:
    "Switching to a new tile URL function and calling globeTileEngineClearCache() throws away the loaded tiles, so the globe reloads them in the new style. The card steps through dark, light and grid tiles.",
  section: "Globe Layer",
  tags: ["globeTileEngineClearCache", "globeTileEngineUrl"],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

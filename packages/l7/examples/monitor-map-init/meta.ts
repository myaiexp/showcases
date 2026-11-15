// l7 example: Map initialisation log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Map initialisation log",
  summary:
    "A Scene created with debug: true logs its startup; getDebugService().getLog('map') returns the map's steps with their timestamps.",
  section: "Tutorial: Monitor",
  tags: ["debug", "getDebugService", "getLog"],
  docs: ["repo/site/docs/tutorial/monitor/map_init.en.md", "repo/site/docs/api/debug/debugservice.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

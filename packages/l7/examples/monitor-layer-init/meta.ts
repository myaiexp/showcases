// l7 example: Layer initialisation log
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Layer initialisation log",
  summary:
    "After a layer's inited event, getLog(layer.id) holds the start and end of each init stage: source, scale, mapping, model building. Rebuild with more points to see which stage grows.",
  section: "Tutorial: Monitor",
  tags: ["getLog", "inited", "layerInitStart", "buildModelEnd"],
  docs: ["repo/site/docs/tutorial/monitor/layer_init.en.md", "repo/site/docs/api/debug/debugservice.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

// vega example: Projections: fit and size
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Projections: fit and size",
  summary:
    "Pick a state and the projection refits itself to it: fit takes the state's GeoJSON, size the view box it must fill.",
  section: "Projections",
  tags: ["projection.fit", "projection.size", "signal.bind", "transform.filter"],
  docs: ["repo/docs/docs/projections.md", "repo/docs/docs/transforms/geoshape.md", "repo/docs/docs/transforms/filter.md", "repo/docs/data/us-10m.json", "repo/docs/docs/signals.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

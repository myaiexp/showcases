// l7 example: Source events and destroy
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source events and destroy",
  summary:
    "A Source emits update with type inited once parsed and type update after changes; destroy() drops its listeners and data.",
  section: "Source",
  tags: ["Source","update","inited","destroy","setData","updateFeaturePropertiesById"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

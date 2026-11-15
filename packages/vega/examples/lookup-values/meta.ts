// vega example: Lookup: Copy Values with Default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Lookup: Copy Values with Default",
  summary:
    "Six sales rows look up a label in a second dataset. Misses fall back to the default '(unknown)' and turn the bar red; shrinking the lookup table with the slider adds more misses.",
  section: 'Transforms: Basic',
  tags: ["transform.lookup.from", "transform.lookup.key", "transform.lookup.fields", "transform.lookup.values", "transform.lookup.as", "transform.lookup.default"],
  docs: ["repo/docs/docs/transforms/lookup.md", "repo/docs/docs/transforms/window.md", "repo/docs/docs/transforms/filter.md", "repo/docs/docs/expressions.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

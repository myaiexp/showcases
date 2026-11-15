// l7 example: Source transform: filter
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Source transform: filter",
  summary:
    "The filter transform drops rows whose callback returns false before any layer sees them; drag the slider to change the threshold.",
  section: "Source",
  tags: ["transforms","filter","callback","setData"],
  docs: ["repo/site/docs/api/source/source.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

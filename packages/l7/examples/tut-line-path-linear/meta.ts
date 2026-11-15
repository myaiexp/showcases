// l7 example: Path gradient
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Path gradient",
  summary:
    "sourceColor and targetColor colour a path from its start to its end. They win over color() when both are set.",
  section: "Tutorial: Line",
  tags: ["sourceColor","targetColor","linear","line"],
  docs: ["repo/site/docs/tutorial/line/path.en.md","repo/site/docs/api/common/features/linear.en.md"],
  provenance: 'pure',
  added: '2026-11-15',
});

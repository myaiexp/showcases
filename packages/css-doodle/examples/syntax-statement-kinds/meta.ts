// The syntax overview's first doodle: :doodle, a @cell random block, :hover
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Declarations, selector blocks, conditional blocks',
  summary:
    "The syntax overview's sample doodle: @grid set inside a :doodle selector block, two plain declarations every cell gets, a @cell(random .3) conditional block that paints about 30% of the cells black, and a :hover block that attaches to each cell. A new seed picks other cells.",
  section: 'Syntax overview',
  tags: [":doodle", ":hover", "@cell", "random", "@grid", "declarations"],
  docs: ["pages/css-doodle-com/syntax-overview.md", "repo/docs/grammar.md"],
  provenance: 'pure',
  added: '2026-11-14',
});

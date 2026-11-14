// vchart example: Pie label layout for crowded labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie label layout for crowded labels",
  summary:
    "Twenty-two sectors, half of them thin, show how label.layout.align (arc, labelLine, edge), strategy (priority, vertical, none), tangentConstraint and coverEnable resolve overlapping outside labels.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'label.layout', 'align', 'strategy', 'tangentConstraint', 'coverEnable'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Pie.md',
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

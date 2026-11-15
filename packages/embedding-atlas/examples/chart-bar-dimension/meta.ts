// embedding-atlas example: bar width forms: number, ratio, gap, clampToRatio
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Bar width: number, ratio and gap",
  summary:
    "A bar chart of topics where only the layer width changes: 12, { ratio: 0.3 }, { gap: 20 } between bars, and { gap: 1, clampToRatio: 0.2 } which stops the bars growing past a fifth of their slot.",
  section: "Charts",
  tags: ['width', 'Dimension', 'ratio', 'gap', 'clampToRatio', 'mark: bar'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// vchart example: Combination: a radar over a rose
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Combination: a radar over a rose",
  summary:
    "A polar combination chart: a rose series and a two-category radar series share one coordinate system. A combination chart cannot infer its axes, so the angle and radius axes are declared in axes.",
  section: "Combination",
  tags: ['common','rose','radar','axes','angle','radius'],
  docs: [
    'repo/docs/assets/guide/en/tutorial_docs/Chart_Types/Combination.md',
    'repo/docs/assets/option/en/chart/common.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// embedding-atlas example: style.paintOrder for fill and stroke
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Paint order",
  summary:
    "Thick-ringed bubbles with paintOrder \"fill stroke\" (the default, stroke over fill) and \"stroke fill\" (fill over the inner half of the stroke, so the ring looks thinner).",
  section: "Charts",
  tags: ['style', 'paintOrder', 'strokeWidth', 'mark: point'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

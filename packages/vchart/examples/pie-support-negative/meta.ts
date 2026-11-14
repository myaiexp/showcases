// vchart example: Pie supportNegative
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Pie supportNegative",
  summary:
    "By default a pie cannot show negative values. supportNegative: true treats them as absolute values so Refunds and Costs get sectors; the select and the preview toggle it, with labels that still show the signed numbers.",
  section: "Pie, Rose and Radar",
  tags: ['pie', 'supportNegative', 'label.formatMethod'],
  docs: [
    'repo/docs/assets/option/en/series/pie.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

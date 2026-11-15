// Vizzu example: numberFormat writes numbers as plain, grouped or prefixed on labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Number format',
  summary:
    "numberFormat decides how a number is written on a label. Vizzu's default is 'prefixed' (1.413 G); 'none' writes every digit, and 'grouped' adds thousand separators. The y-axis labels keep their own numberFormat, so they stay prefixed here.",
  section: 'Style',
  tags: ['style', 'plot.marker.label.numberFormat'],
  docs: ['repo/docs/tutorial/style.md', 'repo/src/apps/weblib/typeschema-api/styles.yaml'],
  provenance: 'pure',
  added: '2026-11-15',
});

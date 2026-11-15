// Vizzu example: numberScale names the units used by the prefixed number format
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Number scale',
  summary:
    "With numberFormat 'prefixed', numberScale picks the unit names: SI symbols (k, M, G), short-scale US (K, M, B, T), short-scale UK (k, m, bn, tn), or your own comma separated list such as 'thousand,million,billion'.",
  section: 'Style',
  tags: ['style', 'plot.marker.label.numberScale', 'plot.marker.label.numberFormat'],
  docs: ['repo/docs/tutorial/style.md', 'repo/src/apps/weblib/typeschema-api/styles.yaml'],
  provenance: 'pure',
  added: '2026-11-15',
});

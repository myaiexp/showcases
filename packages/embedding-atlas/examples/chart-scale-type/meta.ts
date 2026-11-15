// embedding-atlas example: scale.x.type: linear, log, symlog, time and band
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Scale types",
  summary:
    "The same words histogram on a linear, log and symlog x scale (symlog takes a constant), then the published date on a time scale and the source column on a band scale.",
  section: "Charts",
  tags: ['scale', 'type', 'linear', 'log', 'symlog', 'constant', 'time', 'band'],
  docs: [
    'repo/packages/viewer/src/charts/spec/spec.ts',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

// vega example: Symmetric Log Scale
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Symmetric Log Scale",
  summary:
    "Values from -1000 to 1000, zero included, on a symlog axis. The constant sets how wide the near-linear region around zero is: small constants crowd the small values together, large ones spread them out.",
  section: "Scales",
  tags: ['scale.type','scale.constant','signal.bind'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

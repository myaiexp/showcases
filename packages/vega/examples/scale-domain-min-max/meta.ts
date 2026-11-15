// vega example: domainMin and domainMax
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "domainMin and domainMax",
  summary:
    "A scatterplot whose x domain would span the data. Two signals override its ends, zooming and clipping the plot without touching the data.",
  section: "Scales",
  tags: ['scale.domainMin','scale.domainMax','scale.domain.data'],
  docs: ['repo/docs/docs/scales.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

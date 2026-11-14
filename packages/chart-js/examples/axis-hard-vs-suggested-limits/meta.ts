// Chart.js example: Fixed limits vs suggested limits
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Fixed limits vs suggested limits",
  summary:
    "min and max are hard ends that cut off data beyond them, while suggestedMin and suggestedMax only widen the range and give way when the data grows past them.",
  section: 'Axes',
  tags: ['min','max','suggestedMin','suggestedMax'],
  docs: ['repo/docs/axes/index.md','repo/docs/axes/cartesian/linear.md','repo/docs/charts/bar.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

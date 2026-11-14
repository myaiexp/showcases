// observable-plot example: Curves: closed curves
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Curves: closed curves',
  summary:
    'The closed curve variants join the last point back to the first, so a loop of points becomes a filled shape; the open variants leave a gap.',
  section: 'Curves',
  tags: ['line', 'curve', 'linear-closed', 'basis-closed', 'cardinal-closed', 'catmull-rom-closed'],
  docs: ['repo/docs/features/curves.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

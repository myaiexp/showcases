// vega example: Time: Floor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Time: Floor to a Unit',
  summary:
    'Forty timestamps (blue) joined to their timeFloor or utcFloor results (orange) for months, quarters, weeks and stepped days or hours; pick the units and step and the dots regroup.',
  section: 'Time',
  tags: ['time.timeFloor', 'time.utcFloor', 'scale.type', 'mark.rule'],
  docs: ['repo/docs/docs/api/time.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

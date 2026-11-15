// d2 example: Position: outside and border labels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position: outside and border labels',
  summary:
    'A label can sit outside its shape (`outside-bottom-center`) or straddle the border (`border-top-center`) when `near` is given those prefixes. The outer container labels below its box, the inner one on its top border.',
  section: 'Positions',
  tags: ['near', 'label', 'outside', 'border'],
  docs: ['repo/docs/tour/positions.md', 'repo/static/d2/border-label.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});

// d2 example: Position: label and icon near
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Position: label and icon near',
  summary:
    '`near` nested under `label` and `icon` places them inside the shape (`top-center`, `bottom-right`) or outside its box with an `outside-` prefix. Here the label sits at the top and the icon outside the corner.',
  section: 'Positions',
  tags: ['near', 'label', 'icon'],
  docs: ['repo/docs/tour/positions.md', 'repo/static/d2/near-label-icon.d2'],
  provenance: 'pure',
  added: '2026-11-15',
});

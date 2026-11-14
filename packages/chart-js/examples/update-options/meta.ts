// Chart.js example: Changing options after creation
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Changing options after creation',
  summary:
    'Edit one option in place and the rest stays; assign a whole new options object and the old ones are discarded; swap one axis between linear and logarithmic by id.',
  section: 'Developers',
  tags: ['update', 'options', 'scales', 'logarithmic'],
  docs: ['repo/docs/developers/updates.md', 'repo/docs/axes/cartesian/logarithmic.md'],
  provenance: 'pure',
  added: '2026-11-14',
});

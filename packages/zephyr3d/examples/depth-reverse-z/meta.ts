// zephyr3d example: Depth precision: reverse-Z, the default
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth precision: reverse-Z, the default',
  summary:
    'Two ground planes 5 mm apart reaching 20 km away, near plane 0.05. Reverse-Z puts the near plane at depth 1 and the far plane at 0, where float precision is highest, so the upper plane wins everywhere. The read-out lists REVERSE_Z and the DEPTH_* constants.',
  section: 'Advanced Topics',
  tags: ['REVERSE_Z', 'Z_CONVENTION', 'DEPTH_CLEAR_VALUE', 'DEPTH_COMPARE_DEFAULT', 'z-fighting'],
  docs: ['repo/apps/doc/web/en/reverse-z.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

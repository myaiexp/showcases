// zephyr3d example: Depth precision: standard-Z
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Depth precision: standard-Z',
  summary:
    'The reverse-Z scene again, with globalThis.__ZEPHYR3D_REVERSE_Z__ = false set before the engine loads. Far depths crowd towards 1 where float precision is poorest, and the lower red plane bleeds through in the distance. The DEPTH_* constants flip with the convention.',
  section: 'Advanced Topics',
  tags: ['__ZEPHYR3D_REVERSE_Z__', 'Z_CONVENTION', 'DEPTH_CLEAR_VALUE', 'z-fighting'],
  docs: ['repo/apps/doc/web/en/reverse-z.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

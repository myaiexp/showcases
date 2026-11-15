// zephyr3d example: Point light and its range
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Point light and its range',
  summary:
    'A PointLight circling over boxes. Its position is the node position; with range at its default of 0 the falloff radius is derived from intensity, and setting range explicitly bounds the light\'s influence.',
  section: 'Lighting',
  tags: ['PointLight', 'intensity', 'range', 'color', 'position'],
  docs: ['repo/apps/doc/web/en/lighting-direct.md', 'repo/apps/doc/src/tut-12/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

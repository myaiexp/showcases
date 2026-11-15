// zephyr3d example: Rect light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Rect light',
  summary:
    'A RectLight circling glossy boxes and a smooth floor so its rectangle-shaped highlight shows. width, height, range and intensity are live; an unlit panel parented to the light marks it, since the light draws nothing itself.',
  section: 'Lighting',
  tags: ['RectLight', 'width', 'height', 'range', 'intensity', 'lookAt', 'PBRMetallicRoughnessMaterial'],
  docs: ['repo/apps/doc/web/en/lighting-direct.md', 'repo/apps/doc/src/tut-83/main.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

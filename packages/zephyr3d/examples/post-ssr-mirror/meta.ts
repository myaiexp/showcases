// zephyr3d example: Screen-space reflections with HiZ
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Screen-space reflections with HiZ',
  summary:
    'camera.SSR traces reflections from the depth and normal buffers, so a polished floor mirrors the balls and the tower without a probe. camera.HiZ accelerates the trace; ssrMaxRoughness decides which surfaces reflect.',
  section: 'Post-processing',
  tags: ['SSR', 'HiZ', 'ssrMaxRoughness'],
  docs: ['repo/apps/doc/web/en/posteffect-ssr.md', 'repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// zephyr3d example: Temporal anti-aliasing and its debug views
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Temporal anti-aliasing and its debug views',
  summary:
    'camera.TAA jitters the projection each frame and blends the result with reprojected history. camera.TAADebug swaps the output for the current colour, the history, the velocity buffer, the edge mask and other intermediates.',
  section: 'Post-processing',
  tags: ['TAA', 'TAADebug', 'TAA_DEBUG_VELOCITY'],
  docs: ['repo/apps/doc/web/en/posteffect-taa.md', 'repo/apps/doc/web/en/posteffect-intro.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

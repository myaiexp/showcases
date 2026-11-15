// zephyr3d example: Bloom pyramid depth, filter radius and Karis average
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom pyramid depth, filter radius and Karis average',
  summary:
    'The knobs that set how far and how soft a bloom halo spreads: bloomMaxDownsampleLevels, bloomDownsampleLimit, bloomFilterRadius, and bloomKarisAverage, which holds back fireflies from sharp highlights on a metal torus.',
  section: 'Post-processing',
  tags: ['bloom', 'bloomMaxDownsampleLevels', 'bloomDownsampleLimit', 'bloomFilterRadius', 'bloomKarisAverage'],
  docs: ['repo/apps/doc/web/en/posteffect-bloom.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

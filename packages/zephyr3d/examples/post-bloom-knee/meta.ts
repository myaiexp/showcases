// zephyr3d example: Bloom threshold knee and intensity
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom threshold knee and intensity',
  summary:
    'Twelve spheres brighten in small steps across camera.bloomThreshold. With bloomThresholdKnee 0 the halo pops on at the threshold; a non-zero knee blends it in. bloomIntensity scales the additive blend.',
  section: 'Post-processing',
  tags: ['bloom', 'bloomThreshold', 'bloomThresholdKnee', 'bloomIntensity'],
  docs: ['repo/apps/doc/web/en/posteffect-bloom.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

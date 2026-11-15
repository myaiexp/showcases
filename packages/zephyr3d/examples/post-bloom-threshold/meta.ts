// zephyr3d example: Bloom threshold against emissive strength
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bloom threshold against emissive strength',
  summary:
    'Six identical spheres with emissiveStrength doubling from 0.5 to 16. Bloom only picks pixels above camera.bloomThreshold, so lowering it makes the halos appear one by one from the brightest sphere.',
  section: 'Post-processing',
  tags: ['bloom', 'bloomThreshold', 'bloomIntensity', 'emissiveStrength', 'emissiveColor'],
  docs: ['repo/apps/doc/web/en/posteffect-bloom.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

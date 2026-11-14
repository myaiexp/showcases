// babylon-js example: Particle flow map
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Particle flow map',
  summary:
    'Particles spawned at rest across the view are carried by a flow map: a generated 128×128 RGBA image whose red and green encode a screen-space direction and alpha its strength, here a counter-clockwise ring. A CPU ParticleSystem takes it as new FlowMap(width, height, bytes), scaled by flowMapStrength.',
  section: 'Particles',
  tags: ['FlowMap', 'flowMap', 'flowMapStrength', 'ParticleSystem'],
  docs: ['repo/content/features/featuresDeepDive/particles/particle_system/flowMap.md'],
  provenance: 'pure',
  added: '2026-11-13',
});

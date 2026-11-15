// globe-gl example: Particles: hover and click
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Particles: hover and click",
  summary:
    "particleLabel names each dot in a tooltip, onParticleHover receives the dot under the pointer (or null) and enlarges and reddens the set, and onParticleClick gets the dot, the event and the clicked position and flies there.",
  section: "Particles Layer",
  tags: ['onParticleHover', 'onParticleClick', 'particleLabel', 'particlesSizeAttenuation', 'particlesColor'],
  docs: ['repo/README.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

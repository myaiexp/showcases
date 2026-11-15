// postprocessing example: God rays: a moving light
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'God rays: a moving light',
  summary:
    "The sun mesh sweeps sideways and up and down behind the pillars. GodRaysEffect reads the mesh's position every frame, so the shafts swing with it, and they vanish when the depth buffer hides the sun behind an occluder.",
  section: 'God Rays',
  tags: ['GodRaysEffect', 'lightSource', 'weight', 'exposure'],
  docs: ['repo/README.md', 'repo/src/effects/GodRaysEffect.js', 'repo/src/materials/GodRaysMaterial.js', 'repo/src/effects/glsl/god-rays.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});

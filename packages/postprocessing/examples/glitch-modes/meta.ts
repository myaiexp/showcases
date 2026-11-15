// postprocessing example: the four GlitchMode values of GlitchEffect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: modes',
  summary:
    'GlitchEffect.mode picks when the picture tears: DISABLED never, SPORADIC in bursts after a random delay, CONSTANT_MILD on every frame with the weak strength, CONSTANT_WILD on every frame with the strong strength.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'GlitchMode', 'mode', 'delay', 'duration'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/enums/GlitchMode.js', 'repo/src/effects/glsl/glitch.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});

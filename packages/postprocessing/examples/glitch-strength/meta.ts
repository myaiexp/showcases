// postprocessing example: GlitchEffect strength for weak and strong glitches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: strength',
  summary:
    'The strength option is a Vector2 of (weak, strong). The weak value scales CONSTANT_MILD glitches and the strong value scales CONSTANT_WILD ones: both the size of the shift and the width of the colour split grow with it.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'strength', 'minStrength', 'maxStrength', 'GlitchMode.CONSTANT_MILD', 'GlitchMode.CONSTANT_WILD'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/enums/GlitchMode.js', 'repo/src/effects/glsl/glitch.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});

// postprocessing example: Vignette: technique
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vignette: technique',
  summary:
    "VignetteTechnique.DEFAULT gives a dusty, gradual falloff; VignetteTechnique.ESKIL gives a harder, burned one. The technique option, also settable at runtime, switches the shader define.",
  section: 'Depth of Field',
  tags: ['VignetteEffect', 'VignetteTechnique', 'technique'],
  docs: ['repo/README.md', 'repo/src/effects/VignetteEffect.js', 'repo/src/effects/glsl/vignette.frag', 'repo/src/enums/VignetteTechnique.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

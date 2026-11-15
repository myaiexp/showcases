// postprocessing example: Blend functions: lighten, screen, dodge, add
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Blend functions: lighten, screen, dodge, add',
  summary:
    'The brightening family over the same picture: LIGHTEN, SCREEN, COLOR_DODGE, LINEAR_DODGE and ADD. Each leaves black untouched and pushes the rest toward white; ADD is the only one here that is not clamped to 1.',
  section: 'Blending',
  tags: ['BlendFunction', 'blendMode', 'TextureEffect', 'opacity', 'LIGHTEN', 'SCREEN', 'COLOR_DODGE', 'LINEAR_DODGE', 'ADD'],
  docs: ['repo/README.md', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/blending/BlendMode.js', 'repo/src/effects/TextureEffect.js', 'repo/src/effects/blending/glsl/lighten.frag', 'repo/src/effects/blending/glsl/screen.frag', 'repo/src/effects/blending/glsl/color-dodge.frag', 'repo/src/effects/blending/glsl/linear-dodge.frag', 'repo/src/effects/blending/glsl/add.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});

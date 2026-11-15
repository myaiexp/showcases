// postprocessing example: GlitchEffect columns sets the size of the torn blocks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Glitch: columns',
  summary:
    'GlitchEffect.columns scales the blocky bands that get displaced: a small value tears thin horizontal and vertical strips, a large one throws wide slabs of the picture around.',
  section: 'Glitch',
  tags: ['GlitchEffect', 'columns', 'GlitchMode.CONSTANT_WILD'],
  docs: ['repo/README.md', 'repo/src/effects/GlitchEffect.js', 'repo/src/effects/glsl/glitch.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});

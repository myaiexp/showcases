// postprocessing example: Vignette: offset and darkness
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Vignette: offset and darkness',
  summary:
    "VignetteEffect darkens the frame towards its corners. The offset pushes the start of the falloff outwards or pulls it into the centre, and darkness sets how dark the edges end up.",
  section: 'Depth of Field',
  tags: ['VignetteEffect', 'offset', 'darkness'],
  docs: ['repo/README.md', 'repo/src/effects/VignetteEffect.js', 'repo/src/effects/glsl/vignette.frag', 'repo/src/enums/VignetteTechnique.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

// postprocessing example: changing the blend function of a live effect
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Switching the blend function at runtime',
  summary:
    'The blend function of a running TextureEffect is swapped by assigning blendMode.blendFunction. BlendMode dispatches a change event on every assignment, even of the same value, and the readout counts them next to the length of the blend shader code.',
  section: 'Blending',
  tags: ['blendMode', 'blendFunction', 'BlendMode', 'change', 'getShaderCode', 'TextureEffect'],
  docs: ['repo/README.md', 'repo/src/effects/blending/BlendMode.js', 'repo/src/enums/BlendFunction.js', 'repo/src/effects/TextureEffect.js'],
  provenance: 'pure',
  added: '2026-11-15',
});

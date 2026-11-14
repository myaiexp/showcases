// deck-gl example: a LayerExtension with constructor options, props and a draw hook
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer extension: options, props and a draw hook',
  summary:
    "A LayerExtension whose constructor opts choose between two GLSL bodies (fade or cut), whose defaultProps add fadeCenter and fadeRadius to the layers it is attached to, and whose draw method writes the uniforms before each layer's own draw. Used on an ArcLayer and a ScatterplotLayer.",
  section: 'Custom layers',
  tags: ['LayerExtension', 'opts', 'draw', 'getShaders', 'defaultProps', 'uniform block'],
  docs: [
    'repo/docs/developer-guide/custom-layers/layer-extensions.md',
    'repo/docs/developer-guide/custom-layers/writing-shaders.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

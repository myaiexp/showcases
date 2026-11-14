// deck-gl example: override getShaders with a fragment inject hook and a custom uniform
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassed layer: fragment shader hook',
  summary:
    'A ScatterplotLayer subclass overrides getShaders to append a uniform-block shader module and inject into fs:DECKGL_FILTER_COLOR, discarding the middle of every dot. The holeRatio prop reaches the shader from updateState through setShaderModuleProps.',
  section: 'Custom layers',
  tags: ['subclass', 'getShaders', 'inject', 'DECKGL_FILTER_COLOR', 'uniform block', 'discard'],
  docs: [
    'repo/docs/developer-guide/custom-layers/subclassed-layers.md',
    'repo/docs/developer-guide/custom-layers/writing-shaders.md',
    'repo/docs/developer-guide/custom-layers/layer-extensions.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

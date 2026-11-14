// deck-gl example: subclass a layer to add an instanced attribute and a hook
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Subclassed layer: an extra instanced attribute',
  summary:
    "A ScatterplotLayer subclass registers an instancePhase attribute in initializeState (addInstanced with a getPhase accessor), adds a uniform block module, and injects into vs:#decl and vs:DECKGL_FILTER_SIZE through getShaders so each dot pulses out of step.",
  section: 'Custom layers',
  tags: ['subclass', 'addInstanced', 'AttributeManager', 'getShaders', 'inject', 'uniform block', 'ShaderModule'],
  docs: [
    'repo/docs/developer-guide/custom-layers/subclassed-layers.md',
    'repo/docs/developer-guide/custom-layers/writing-shaders.md',
    'repo/docs/developer-guide/custom-layers/attribute-management.md',
    'repo/docs/api-reference/core/attribute-manager.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

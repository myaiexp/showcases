// deck-gl example: the layer lifecycle methods logged as they run
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Layer lifecycle: a live log',
  summary:
    'A ScatterplotLayer subclass logs initializeState, shouldUpdateState (with the changeFlags that fired), updateState, draw and finalizeState. Changing a prop, panning, adding and removing the layer, and the updateOnViewport option show which stage runs when.',
  section: 'Custom layers',
  tags: ['lifecycle', 'initializeState', 'shouldUpdateState', 'updateState', 'finalizeState', 'draw', 'changeFlags'],
  docs: [
    'repo/docs/developer-guide/custom-layers/layer-lifecycle.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// deck-gl example: defaultProps with prop types decide which changes update
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Prop types: what counts as a change',
  summary:
    'A composite layer declares defaultProps with number (min and max), color, accessor, function, object (compare: true) and boolean types. Re-rendering with fresh closures, a new array holding the same colour and an equal object leaves updateState uncalled; a new colour or width calls it. The readout counts the calls.',
  section: 'Custom layers',
  tags: ['defaultProps', 'prop types', 'accessor', 'color', 'number', 'function', 'object', 'updateState'],
  docs: [
    'repo/docs/developer-guide/custom-layers/prop-types.md',
    'repo/docs/developer-guide/custom-layers/README.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// deck-gl example: an async layer prop resolved from a Promise, with transform and release
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Async props: transform and release',
  summary:
    "A layer prop declared {type: 'object', async: true} accepts a Promise. The layer reads null until it resolves, the prop's transform turns the resolved hex strings into colours, and release runs when a newer value replaces them. The palette Promises resolve after a timer, so nothing is fetched.",
  section: 'Custom layers',
  tags: ['async', 'prop types', 'transform', 'release', 'Promise', 'CompositeLayer', 'defaultProps'],
  docs: [
    'repo/docs/developer-guide/custom-layers/prop-types.md',
    'repo/docs/developer-guide/custom-layers/composite-layers.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

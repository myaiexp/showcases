// aframe example: utils.styleParser: CSS-like strings to objects and back
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.styleParser: CSS-like strings to objects and back',
  summary:
    'parse turns "attribute: color; dur: 5000;" into an object of strings and stringify turns an object back into a style string. The parsed dur drives a spinning box\'s animation.',
  section: 'Core API',
  tags: ['AFRAME.utils.styleParser', 'parse', 'stringify'],
  docs: ['repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

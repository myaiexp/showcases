// fabric example: Serialization: NUM_FRACTION_DIGITS precision
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Serialization: NUM_FRACTION_DIGITS precision',
  summary:
    'config.NUM_FRACTION_DIGITS decides how many decimals toObject and toSVG keep. Set low, a scale like 0.0151 is saved as 0.02 and the object loaded back is a third larger. The setting is page-wide, so it is changed and restored around each export.',
  section: 'Serialization',
  tags: ['NUM_FRACTION_DIGITS', 'config', 'toObject', 'toSVG', 'loadFromJSON'],
  docs: [
    'repo/src/content/docs/docs/Old docs/gotchas.md',
    'repo/src/content/docs/docs/core-concepts.md',
    'repo/src/content/docs/api/variables/config.md',
  ],
  provenance: 'pure',
  added: '2026-11-16',
});

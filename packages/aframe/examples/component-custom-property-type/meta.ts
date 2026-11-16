// aframe example: Custom property type with parse and stringify
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Custom property type with parse and stringify',
  summary:
    'The docs\' slash-delimited property: parse turns "a/b" into an array when setAttribute runs, and stringify turns the array back into text when flushToDOM writes the attribute. A text entity shows the parsed array.',
  section: 'Core API',
  tags: ['parse', 'stringify', 'custom property type', 'flushToDOM', 'text'],
  docs: ['repo/docs/core/component.md', 'repo/docs/components/text.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

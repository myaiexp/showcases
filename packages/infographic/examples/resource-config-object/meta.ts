// AntV Infographic example: Resources: ResourceConfig objects instead of strings
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Resources: ResourceConfig objects instead of strings',
  summary:
    'An icon can be a ResourceConfig object rather than a string, with source, format, encoding and data. The three items in the options object use raw SVG text, an encoded SVG data URI and a canvas-drawn PNG; the steps change the shapes and the PNG colour. Each object sets scene to icon itself, because in 0.2.20 an object without it is given one after its id is computed and its icon never shows.',
  section: 'Resources',
  tags: ['ResourceConfig', 'source', 'format', 'encoding', 'data', 'inline'],
  docs: [
    'repo/site/src/content/learn/resources.en.md',
  ],
  provenance: 'pure',
  added: '2026-11-15',
});

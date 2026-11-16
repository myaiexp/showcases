// aframe example: Built-in property types: how each one parses a string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Built-in property types: how each one parses a string',
  summary:
    'One component with a property of every built-in type is given strings from the markup. The board lists what each became: an int drops the fraction, a selector finds the element, vec3 becomes an object, an asset id becomes the image URL.',
  section: 'Core API',
  tags: ['array', 'boolean', 'color', 'int', 'number', 'selector', 'selectorAll', 'string', 'vec2', 'vec3', 'vec4', 'asset', 'map'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

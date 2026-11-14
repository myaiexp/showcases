// deck-gl example: JSON: @@function Registry
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSON: @@function Registry',
  summary:
    'The @@function key calls a function registered in the configuration with the rest of the object as arguments: one returns an accessor, one a colour ramp, one a plain clamped number.',
  section: 'JSON',
  tags: ['JSONConverter', '@@function', 'functions', 'JSONConfiguration'],
  docs: [
    'repo/docs/api-reference/json/conversion-reference.md',
    'repo/docs/api-reference/json/json-configuration.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

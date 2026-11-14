// deck-gl example: JSONConfiguration: Conversion Hooks
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSONConfiguration: Conversion Hooks',
  summary:
    'The two hooks of a configuration: preProcessClassProps rewrites each class props before it is built (here fading every layer), and postProcessConvertedJson cleans the converted result (dropping an unregistered layer).',
  section: 'JSON',
  tags: ['JSONConfiguration', 'preProcessClassProps', 'postProcessConvertedJson', 'JSONConverter'],
  docs: [
    'repo/docs/api-reference/json/json-configuration.md',
    'repo/docs/api-reference/json/overview.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

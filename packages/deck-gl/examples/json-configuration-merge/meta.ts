// deck-gl example: JSONConfiguration: Merging Classes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSONConfiguration: Merging Classes',
  summary:
    'A configuration lists the classes a spec may name: an @@type that is not registered converts to null, and mergeConfiguration adds ArcLayer to the converter so the same spec draws its arcs.',
  section: 'JSON',
  tags: ['JSONConverter', 'JSONConfiguration', 'mergeConfiguration', 'classes'],
  docs: [
    'repo/docs/api-reference/json/json-configuration.md',
    'repo/docs/api-reference/json/json-converter.md',
    'repo/docs/api-reference/json/conversion-reference.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

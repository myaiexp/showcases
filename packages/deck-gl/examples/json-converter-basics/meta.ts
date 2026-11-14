// deck-gl example: JSONConverter: Spec to Deck Props
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSONConverter: Spec to Deck Props',
  summary:
    'A JSON document describing a layer, with @@type naming ScatterplotLayer and @@= strings as accessors, run through JSONConverter.convert and handed to Deck.setProps.',
  section: 'JSON',
  tags: ['JSONConverter', 'convert', '@@type', '@@='],
  docs: [
    'repo/docs/api-reference/json/overview.md',
    'repo/docs/api-reference/json/json-converter.md',
    'repo/docs/api-reference/json/conversion-reference.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

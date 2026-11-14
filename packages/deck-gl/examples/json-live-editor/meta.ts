// deck-gl example: JSON: Live Spec Editor
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'JSON: Live Spec Editor',
  summary:
    'A textarea of JSON that is converted on every keystroke and set on the Deck: edit the layers, accessors and colours of a preset spec and watch it redraw, with conversion errors shown below.',
  section: 'JSON',
  tags: ['JSONConverter', 'convert', '@@type', '@@=', 'setProps'],
  docs: [
    'repo/docs/api-reference/json/overview.md',
    'repo/docs/api-reference/json/json-converter.md',
    'repo/docs/api-reference/json/conversion-reference.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

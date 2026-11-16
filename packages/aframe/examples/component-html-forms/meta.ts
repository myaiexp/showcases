// aframe example: Components in HTML: single-property and multi-property forms
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Components in HTML: single-property and multi-property forms',
  summary:
    'position="1 2 3" is a single-property component whose value is the data; light="type: point; color: crimson" is multi-property and reads like inline CSS. The board prints the parsed data of each.',
  section: 'Core API',
  tags: ['single-property', 'multi-property', 'position', 'light', 'getAttribute'],
  docs: ['repo/docs/core/component.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

// aframe example: utils.getUrlParameter: read ?name=value, or an empty string
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'utils.getUrlParameter: read ?name=value, or an empty string',
  summary:
    'The page\'s query string is changed with history.replaceState, and getUrlParameter(\'testing\') returns the value from ?testing=aframe or an empty string when absent.',
  section: 'Core API',
  tags: ['AFRAME.utils.getUrlParameter', 'query string'],
  docs: ['repo/docs/core/utils.md'],
  provenance: 'pure',
  added: '2026-11-15',
});

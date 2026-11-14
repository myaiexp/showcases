// vchart example: API: getScale('color')
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: getScale(\'color\')',
  summary:
    'getScale returns a scale from the chart\'s global scales by id. The colour scale (\'color\') maps each series key to its colour, so the example builds an HTML swatch list from its domain and range, and re-reads it when the card or a button adds a series.',
  section: 'API',
  tags: ['getScale', 'color scale', 'domain', 'range'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

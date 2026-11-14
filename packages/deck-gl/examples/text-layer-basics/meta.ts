// deck-gl example: TextLayer basics
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'TextLayer basics',
  summary:
    'City names drawn as screen-facing labels: getText and getPosition place them, getSize scales each label with the population and characterSet auto picks up accented letters.',
  section: 'Core layers',
  tags: ['TextLayer', 'getText', 'getPosition', 'getSize', 'getColor', 'characterSet'],
  docs: [
    'repo/docs/api-reference/layers/text-layer.md',
    'repo/docs/api-reference/core/layer.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

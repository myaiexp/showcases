// vchart example: API: updateModelSpec by id and by type
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: updateModelSpec by id and by type',
  summary:
    'updateModelSpec changes one component\'s spec, found either by its id or by { type, index }, without touching the rest of the chart (forceMerge true merges the patch into the whole component spec). Buttons retitle the axis by id, move the legend by type and index, and the card cycles both.',
  section: 'API',
  tags: ['updateModelSpec', 'forceMerge', 'filter', 'id', 'type', 'index', 'axes', 'legends'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

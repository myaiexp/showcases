// vchart example: API: updateDataInBatches
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'API: updateDataInBatches',
  summary:
    'updateDataInBatches takes a list of {id, data} entries and re-renders once, so a bar series and the line series on its own data id change together. Two plain updateData calls can lay the chart out twice; a button counts the layoutEnd events each way and the card sends batches.',
  section: 'API',
  tags: ['updateDataInBatches', 'updateData', 'common chart', 'data id'],
  docs: [
    'repo/docs/assets/api/en/API/vchart.md',
  ],
  provenance: 'pure',
  added: '2026-11-14',
});

// l7 example: Image layer blend modes
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Image layer blend modes',
  summary:
    "The blend option of a layer decides what shows where two pictures overlap: normal keeps the top one, additive adds the colours, subtractive subtracts them, max keeps the brighter channel.",
  section: 'Image Layer',
  tags: ['ImageLayer', 'blend', 'additive', 'subtractive', 'max'],
  docs: ['repo/site/docs/api/image_layer/options.en.md', 'repo/site/docs/api/common/layer/options.en.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
